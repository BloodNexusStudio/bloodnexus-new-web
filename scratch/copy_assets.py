import os
import shutil

# Make target dirs
os.makedirs(r"C:\Users\hibar\OneDrive\Documents\bnweb\bloodnexus-new-web\public\web-apps", exist_ok=True)
os.makedirs(r"C:\Users\hibar\OneDrive\Documents\bnweb\bloodnexus-new-web\public\vr", exist_ok=True)

# List of mappings: (source_filename, destination_path)
mappings = [
    ("odyssey_travels_1784388845250.jpg", r"public\web-apps\odyssey_travels.png"),
    ("fintech_dashboard_1784388861514.jpg", r"public\web-apps\fintech_dashboard.png"),
    ("aura_studios_1784388876728.jpg", r"public\web-apps\aura_studios.png"),
    ("social_connect_1784388888397.jpg", r"public\web-apps\social_connect.png"),
    ("lumina_vision_1784388901734.jpg", r"public\web-apps\lumina_vision.png"),
    ("websites_capability_1784388916281.jpg", r"public\web-apps\websites.png"),
    ("mobile_apps_capability_1784388930920.jpg", r"public\web-apps\mobile_apps.png"),
    ("ecommerce_capability_1784388947401.jpg", r"public\web-apps\ecommerce.png"),
    ("enterprise_capability_1784388963163.jpg", r"public\web-apps\enterprise.png"),
    ("vr_hero_bg_1784388979337.jpg", r"public\vr\vr_hero_bg.png"),
    ("vr_solutions_1784388994786.jpg", r"public\vr\vr_solutions.png"),
    ("vr_gallery_1_1784389010094.jpg", r"public\vr\gallery_1.png"),
    ("vr_gallery_2_1784389025288.jpg", r"public\vr\gallery_2.png")
]

artifact_dir = r"C:\Users\hibar\.gemini\antigravity\brain\c595eb2b-d148-441e-a2ee-2f6d0b080c69"
workspace_dir = r"C:\Users\hibar\OneDrive\Documents\bnweb\bloodnexus-new-web"

for src_name, dest_rel in mappings:
    src_path = os.path.join(artifact_dir, src_name)
    dest_path = os.path.join(workspace_dir, dest_rel)
    
    if os.path.exists(src_path):
        try:
            shutil.copy2(src_path, dest_path)
            print(f"Copied: {src_name} -> {dest_rel}")
        except Exception as e:
            print(f"Error copying {src_name}: {e}")
    else:
        print(f"Source not found: {src_path}")
