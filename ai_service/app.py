
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os, shutil

from inference import run_inference
from schemas import AnalysisResponse

app = FastAPI(title="Brain Tumor AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "outputs/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def health():
    return {"status": "AI service running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return run_inference(file_path)