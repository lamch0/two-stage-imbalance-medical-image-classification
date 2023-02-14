import io
import json
from PIL import Image
# from torchvision import models
# import torchvision.transforms as transforms
# import torch
# from models.get_model import get_arch
# from utils.model_saving_loading import load_model
from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.responses import FileResponse
import aiofiles
from io import BytesIO
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# imagenet_class_index = json.load(open('imagenet_class_index.json'))
# model = models.densenet121(pretrained=True)


model_name = "mobilenetV2"
load_path = ""
# model, mean, std = get_arch(model_name, n_classes=23)
# model, stats = load_model(model, load_path, device='cpu')
# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# model = model.to(device)
# model.eval()

# 图片文件读取，输出Image.Image格式
def read_imagefile(file) -> Image.Image:
    image = Image.open(io.BytesIO(file))
    return image

# 图片预处理，torchvision.transforms转换Image格式为torch tensor
# def transform_image(image_bytes: Image.Image):
#     my_transforms = transforms.Compose([transforms.Resize(255),
#                                         transforms.CenterCrop(224),
#                                         transforms.ToTensor(),
#                                         transforms.Normalize(
#                                             [0.485, 0.456, 0.406],
#                                             [0.229, 0.224, 0.225])])
#     return my_transforms(image_bytes).unsqueeze(0)

# # 定义预测函数，图片预处理->模型预测->预测结果转换
# def get_prediction(image_bytes: Image.Image):
#     tensor = transform_image(image_bytes=image_bytes)
#     outputs = model.forward(tensor)
#     _, y_hat = outputs.max(1)
#     predicted_idx = str(y_hat.item())
#     return imagenet_class_index[predicted_idx]

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    '''
    Parameters
    ----------
    file : UploadFile, optional
        DESCRIPTION. The default is an image file.

    Returns
    -------
    json : Response with list of dicts.
        Each dict contains class_id, class_name

    '''
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"


    img_bytes = read_imagefile(await file.read())
    # class_id, class_name = get_prediction(image_bytes=img_bytes)
    # return {'class_id': class_id, 'class_name': class_name}
    return {"message:": file}

@app.post('/upload')
async def upload(file: UploadFile = File(...)):
    

    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    original_image = Image.open(file.file)
    new_image = BytesIO()
    original_image.save(new_image, "PNG")
    new_image.seek(0)
    return {"Success:": file}
    # return StreamingResponse(new_image, media_type="image/png")

@app.get('/')
def home():
    return {"message:":"Hello World!"}

if __name__ == "__main__":
    app_str = 'app:app'
    uvicorn.run(app_str, host='localhost', port=8000, reload=True, workers=1)