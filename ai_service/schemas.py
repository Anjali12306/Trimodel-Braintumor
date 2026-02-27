from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    prediction: str
    confidence: float
    heatmap_path: str