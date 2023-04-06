import io
import json
import os
import platform
from PIL import Image
from torchvision import models
import torchvision.transforms as transforms
import torch
from models.get_model import get_arch
from utils.model_saving_loading import load_model
from torchvision.models import mobilenet_v2
from fastapi import FastAPI, File, UploadFile, Query
import uvicorn
from fastapi.responses import FileResponse
import aiofiles
from io import BytesIO
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import zipfile
import csv
import shutil

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
transform = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor()
])


@app.post('/predict/eyepacs')
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)

    # Get the operating system name
    os_name = platform.system()
    # check if the uploaded file is a zip file
    if zipfile.is_zipfile(f"uploads/{file.filename}"):
        with zipfile.ZipFile(f"uploads/{file.filename}", 'r') as zip_ref:
            # extract all the files in the zip file
            zip_ref.extractall(f"uploads/{file.filename[:-4]}")
        # loop through the extracted files in macos
        input_tensors = []
        filename_list = []
        if (os_name == "Darwin"): 
            for extracted_file in os.listdir(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}"):
                if extracted_file.endswith(".jpg") or extracted_file.endswith(".jpeg"):
                    # copy the image to the upper directory
                    src_path = os.path.join(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}", extracted_file)
                    dest_path = os.path.join("uploads", extracted_file)
                    shutil.copy(src_path, dest_path)
                    # open each extracted file
                    try:
                        with open(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}/{extracted_file}", "rb") as f:
                            # process each file as required
                            input_image = Image.open(f)
                            input_tensor = transform(input_image).unsqueeze(0)
                            input_tensors.append(input_tensor)
                            filename_list.append(extracted_file)
                    except PIL.UnidentifiedImageError:
                        print(f"Error: cannot identify image file {extracted_file}")
                else:
                    print(f"Skipping file {extracted_file} (not an image file)")
        # loop through the extracted files in other os
        else:
            for extracted_file in os.listdir(f"uploads/{file.filename[:-4]}"):
                # open each extracted file
                with open(f"uploads/{file.filename[:-4]}/{extracted_file}", "rb") as f:
                    # process each file as required

                    input_image = Image.open(f)
                    input_tensor = transform(input_image).unsqueeze(0)
                    input_tensors.append(input_tensor)
                    filename_list.append(extracted_file)
    else:
        # if the uploaded file is not a zip file, process it as usual
        input_image = Image.open(file.file)
        input_tensor = transform(input_image).unsqueeze(0)
        input_tensors = [input_tensor]
        filename_list = [file.filename]

    # load checkpoint and model
    checkpoint = torch.load("model_checkpoint/eyepacs/2tsage_prog/model_checkpoint.pth", map_location=device)
    model = mobilenet_v2(pretrained=True)
    num_ftrs = model.classifier[1].in_features
    model.classifier = torch.nn.Linear(num_ftrs, 5)
    model.load_state_dict(checkpoint['model_state_dict'])

    # Make predictions
    model.eval()
    probs_all = []
    keys = ["DR0", "DR1", "DR2", "DR3", "DR4"]
    list_of_data = []
    # Predict each image
    for i, tensor in enumerate(input_tensors):
        with torch.no_grad():
            output = model(tensor)
            probs = torch.nn.Softmax(dim=1)(output)
            probs_arr = probs.detach().cpu().numpy()
            probs_arr.flatten()
            probs_list = probs_arr.tolist()[0]
            data_dict = dict(zip(keys, probs_list))
            probs_all.extend(probs.detach().cpu().numpy())
        predicted_class = torch.argmax(output).item()
        data_dict["filename"] = filename_list[i]
        data_dict["predicted_class"] = keys[predicted_class]
        list_of_data.append(data_dict)
    with open(f"uploads/{file.filename[:-4]}.csv", 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=list_of_data[0].keys())
        writer.writeheader()
        writer.writerows(list_of_data)
    # Return the predicted class as JSON
    return JSONResponse(content=list_of_data)

@app.post('/predict/endo')
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)
    
    # Get the operating system name
    os_name = platform.system()
    # check if the uploaded file is a zip file
    if zipfile.is_zipfile(f"uploads/{file.filename}"):
        with zipfile.ZipFile(f"uploads/{file.filename}", 'r') as zip_ref:
            # extract all the files in the zip file
            zip_ref.extractall(f"uploads/{file.filename[:-4]}")
        # loop through the extracted files in macos
        input_tensors = []
        filename_list = []
        if (os_name == "Darwin"): 
            for extracted_file in os.listdir(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}"):
                if extracted_file.endswith(".jpg") or extracted_file.endswith(".jpeg"):
                    # copy the image to the upper directory
                    src_path = os.path.join(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}", extracted_file)
                    dest_path = os.path.join("uploads", extracted_file)
                    shutil.copy(src_path, dest_path)
                    # open each extracted file
                    try:
                        with open(f"uploads/{file.filename[:-4]}/{file.filename[:-4]}/{extracted_file}", "rb") as f:
                            # process each file as required
                            input_image = Image.open(f)
                            input_tensor = transform(input_image).unsqueeze(0)
                            input_tensors.append(input_tensor)
                            filename_list.append(extracted_file)
                    except PIL.UnidentifiedImageError:
                        print(f"Error: cannot identify image file {extracted_file}")
                else:
                    print(f"Skipping file {extracted_file} (not an image file)")
        # loop through the extracted files in other os
        else:
            for extracted_file in os.listdir(f"uploads/{file.filename[:-4]}"):
                # open each extracted file
                with open(f"uploads/{file.filename[:-4]}/{extracted_file}", "rb") as f:
                    # process each file as required

                    input_image = Image.open(f)
                    input_tensor = transform(input_image).unsqueeze(0)
                    input_tensors.append(input_tensor)
                    filename_list.append(extracted_file)
    else:
        # if the uploaded file is not a zip file, process it as usual
        input_image = Image.open(file.file)
        input_tensor = transform(input_image).unsqueeze(0)
        input_tensors = [input_tensor]
        filename_list = [file.filename]

    # load checkpoint and model
    checkpoint = torch.load("model_checkpoint/endo/2stage_prog/model_checkpoint.pth", map_location=device)
    model = mobilenet_v2(pretrained=True)
    num_ftrs = model.classifier[1].in_features
    model.classifier = torch.nn.Linear(num_ftrs, 23)
    model.load_state_dict(checkpoint['model_state_dict'])

    # Make predictions
    model.eval()
    probs_all = []
    keys = ['esophagitis', 'normal z-line', 'polyps', 'ulcerative colitis', 'reflux esophagitis', 'hemorrhoids', 'diverticulosis', 'esophageal varices', 'pyloric stenosis', 'z-line irregular', 'duodenal ulcer', 'celiac disease', 'normal-cecum', 'ulcerative colitis-cecum', 'angiodysplasia', 'normal-pylorus', 'portal hypertensive gastropathy', 'dieulafoy lesion', 'normal-2nd portion of duodenum', 'varices', 'abnormal-pylorus', 'abnormal-2nd portion of duodenum', 'ulcerative colitis-rectum']
    list_of_data = []
    list_of_all_data = []
    
    # Predict each image
    for i, tensor in enumerate(input_tensors):
        with torch.no_grad():
            output = model(tensor)
            probs = torch.nn.Softmax(dim=1)(output)
            probs_arr = probs.detach().cpu().numpy()
            probs_arr.flatten()
            probs_list = probs_arr.tolist()[0]
            data_dict = dict(zip(keys, probs_list))
            probs_all.extend(probs.detach().cpu().numpy())
        predicted_class = torch.argmax(output).item()
        sorted_dict = dict(sorted(data_dict.items(), key=lambda x: x[1], reverse=True))
        # only get the top five result
        top_five = dict(list(sorted_dict.items())[:5])
        top_five["filename"] = filename_list[i]
        top_five["predicted_class"] = keys[predicted_class]
        list_of_data.append(top_five)
        data_dict["filename"] = filename_list[i]
        data_dict["predicted_class"] = keys[predicted_class]
        list_of_all_data.append(data_dict)

    # write the csv file and save it
    with open(f"uploads/{file.filename[:-4]}.csv", 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=list_of_all_data[0].keys())
        writer.writeheader()
        writer.writerows(list_of_all_data)
        
    # Return the predicted class as JSON
    return JSONResponse(content=list_of_data)

@app.get("/uploads/{filename}")
async def get_uploaded_file(filename: str):
    return FileResponse(f"uploads/{filename}")

@app.get("/download/{filename}")
async def download_file(filename: str):
    return FileResponse(f"uploads/{filename[:-4]}.csv", media_type='text/csv')

@app.get("/download-csv")
def download_csv(filename: str = Query(..., min_length=1)):
    file_path = f'uploads/{filename[:-4]}.csv'
    return FileResponse(file_path, media_type='text/csv', filename=f'{filename[:-4]}.csv')

if __name__ == "__main__":
    app_str = 'app:app'
    uvicorn.run(app_str, host='localhost', port=8000, reload=True, workers=1)