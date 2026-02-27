import torch
import torch.nn.functional as F
import cv2, os
import numpy as np

from model.model_loader import load_model
from preprocessing.load_mri import load_and_preprocess
from explainability import GradCAM

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
WEIGHTS = "model/final_hybrid_trimodel_ema.pth"

model, idx_to_class = load_model(WEIGHTS, DEVICE)
model.eval()  # ✅ eval mode, but gradients allowed

HEATMAP_DIR = "outputs/heatmaps"
os.makedirs(HEATMAP_DIR, exist_ok=True)


def run_inference(image_path):
    # ---------- Load image ----------
    image_tensor = load_and_preprocess(image_path)
    input_tensor = image_tensor.unsqueeze(0).to(DEVICE)

    # ---------- Forward ----------
    logits = model(input_tensor)
    probs = F.softmax(logits, dim=1)[0]
    pred_idx = torch.argmax(probs).item()

    # ---------- GRAD-CAM ----------
    target_layer = model.cnn.model.layer3[-1].conv3
    gradcam = GradCAM(model, target_layer)

    cam = gradcam.generate(input_tensor, pred_idx)  # (224,224)

    # ---------- Overlay ----------
    img = image_tensor.permute(1, 2, 0).cpu().numpy()
    img = (img - img.min()) / (img.max() - img.min() + 1e-8)

    heatmap = cv2.applyColorMap(
        np.uint8(255 * cam),
        cv2.COLORMAP_JET
    )
    heatmap = heatmap[:, :, ::-1]  # BGR → RGB
    heatmap = heatmap / 255.0

    overlay = 0.7 * img + 0.3 * heatmap
    overlay = np.clip(overlay, 0, 1)

    heatmap_path = os.path.join(
        HEATMAP_DIR,
        os.path.basename(image_path).replace(".", "_cam.")
    )

    cv2.imwrite(
        heatmap_path,
        np.uint8(255 * overlay[:, :, ::-1])  # RGB → BGR for OpenCV
    )

    return {
        "prediction": idx_to_class[pred_idx],
        "confidence": float(probs[pred_idx]),
        "heatmap_path": heatmap_path
    }