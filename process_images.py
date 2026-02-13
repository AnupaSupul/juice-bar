import os
import glob
from rembg import remove

# CORRECT PATH based on list_dir output
ASSETS_DIR = r"c:/Users/supul/OneDrive/Desktop/juice bar/juice bar/public"

def process_image(img_path):
    print(f"Processing: {os.path.basename(img_path)}")
    try:
        with open(img_path, 'rb') as i:
            input_data = i.read()
            # Remove background
            output_data = remove(input_data)
            
            # Save back to same path
            with open(img_path, 'wb') as o:
                o.write(output_data)
                
        print(f"  -> Success!")
    except Exception as e:
        print(f"  -> Failed: {e}")

if __name__ == "__main__":
    print(f"Searching in: {ASSETS_DIR}")
    if os.path.exists(ASSETS_DIR):
        files = glob.glob(os.path.join(ASSETS_DIR, "*.png"))
        print(f"Found {len(files)} PNG images.")
        for f in files:
            process_image(f)
    else:
        print("Directory DOES NOT exist.")
