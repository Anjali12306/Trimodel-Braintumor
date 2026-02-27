import torch
import torch.nn as nn
import timm

# ---- YOUR HybridTriModel ----
class CNN_Backbone(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = timm.create_model("resnet50", pretrained=False, num_classes=0)
        self.out_features = self.model.num_features

    def forward(self, x):
        return self.model(x)

class Swin_Backbone(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = timm.create_model(
            "swin_tiny_patch4_window7_224",
            pretrained=False,
            num_classes=0
        )
        self.out_features = self.model.num_features

    def forward(self, x):
        return self.model(x)

class MobileViT_Backbone(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = timm.create_model(
            "mobilevit_s",
            pretrained=False,
            num_classes=0
        )
        self.out_features = self.model.num_features

    def forward(self, x):
        return self.model(x)

class HybridTriModel(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.cnn = CNN_Backbone()
        self.swin = Swin_Backbone()
        self.mvit = MobileViT_Backbone()

        fused = (
            self.cnn.out_features +
            self.swin.out_features +
            self.mvit.out_features
        )

        self.classifier = nn.Sequential(
            nn.Linear(fused, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        feats = torch.cat([
            self.cnn(x),
            self.swin(x),
            self.mvit(x)
        ], dim=1)
        return self.classifier(feats)


def load_model(weight_path, device):
    checkpoint = torch.load(weight_path, map_location=device)

    model = HybridTriModel(num_classes=checkpoint["num_classes"])
    model.load_state_dict(checkpoint["model_state"])
    model.to(device)
    model.eval()

    class_to_idx = checkpoint["class_to_idx"]
    idx_to_class = {v: k for k, v in class_to_idx.items()}

    return model, idx_to_class