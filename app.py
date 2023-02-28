import io
import json
from PIL import Image
from torchvision import models
import torchvision.transforms as transforms
import torch
from models.get_model import get_arch
from utils.model_saving_loading import load_model
from torchvision.models import mobilenet_v2
from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.responses import FileResponse
import aiofiles
from io import BytesIO
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
checkpoint = torch.load("model_checkpoint/2tsage_prog/model_checkpoint.pth", map_location=device)
transform = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor()
])
model = mobilenet_v2(pretrained=True)
num_ftrs = model.classifier[1].in_features
model.classifier = torch.nn.Linear(num_ftrs, 5)
model.load_state_dict(checkpoint['model_state_dict'])

@app.post('/predict/eyepacs')
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)
    input_image = Image.open(file.file)
    input_tensor = transform(input_image).unsqueeze(0)
    # Make predictions
    model.eval()
    probs_all = []
    keys = ["DR0", "DR1", "DR2", "DR3", "DR4"]
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.nn.Softmax(dim=1)(output)
        probs_arr = probs.detach().cpu().numpy()
        probs_arr.flatten()
        probs_list = probs_arr.tolist()[0]
        data_dict = dict(zip(keys, probs_list))
        probs_all.extend(probs.detach().cpu().numpy())
    predicted_class = torch.argmax(output).item()
    data_dict["filename"] = file.filename
    data_dict["predicted_class"] = predicted_class
    print(data_dict)
    # Return the predicted class as JSON
    return JSONResponse(content=data_dict)

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)
    return {"filename": file.filename}

@app.get("/uploads/{filename}")
async def get_uploaded_file(filename: str):
    return FileResponse(f"uploads/{filename}")


@app.get('/')
def home():
    return {"message:":"Hello World!"}

if __name__ == "__main__":
    app_str = 'app:app'
    uvicorn.run(app_str, host='localhost', port=8000, reload=True, workers=1)