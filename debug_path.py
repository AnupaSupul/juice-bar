import os
import glob
# from rembg import remove
# from PIL import Image

ASSETS_DIR = r"c:/Users/supul/OneDrive/Desktop/juice bar/juice bar/public/assets"

if __name__ == "__main__":
    print(f"Searching in: {ASSETS_DIR}")
    if os.path.exists(ASSETS_DIR):
        print("Directory exists.")
        files = glob.glob(os.path.join(ASSETS_DIR, "*"))
        print(f"Found {len(files)} files total:")
        for f in files:
            print(f" - {os.path.basename(f)}")
    else:
        print("Directory DOES NOT exist.")
