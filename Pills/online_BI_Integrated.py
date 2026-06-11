import os
import time
from datetime import datetime
import glob
import pandas as pd
from inference_sdk import InferenceHTTPClient  # Modern Cloud Client Wrapper

# ==============================================================================
# CONFIGURATION
# ==============================================================================

IMAGE_FOLDER = r"C:\Users\Saranya\Desktop\Sixth Semester\AI edge Intern\New folder"
MODEL_ID = "new-pill/2"
API_KEY = "K9wAJQBHKg5XR1wldAIu"
OUTPUT_CSV = os.path.join(IMAGE_FOLDER, "prediction_results.csv")
POLL_INTERVAL_SECONDS = 2  # Frequency loop throttle

os.makedirs(IMAGE_FOLDER, exist_ok=True)

# Initialize the Hosted Cloud API Connection Endpoint
print("☁️ Initializing Connected Roboflow Cloud Web Client...")
client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com/",
    api_key=API_KEY
)
print("🚀 Connected successfully! Actively watching directory for files...\n")

# ==============================================================================
# MONITORING RUNTIME LOOP
# ==============================================================================
try:
    while True:
        processed_images = set()
        if os.path.exists(OUTPUT_CSV):
            try:
                existing_df = pd.read_csv(OUTPUT_CSV, usecols=["image_name"], keep_default_na=False)
                processed_images = set(existing_df["image_name"].unique())
            except Exception:
                time.sleep(POLL_INTERVAL_SECONDS)
                continue

        image_extensions = ["*.jpeg", "*.jpg", "*.png"]
        all_image_paths = []
        for ext in image_extensions:
            all_image_paths.extend(glob.glob(os.path.join(IMAGE_FOLDER, ext)))

        new_image_paths = [p for p in all_image_paths if os.path.basename(p) not in processed_images]
        new_image_paths.sort()

        if new_image_paths:
            print(f"🌟 Found {len(new_image_paths)} new image(s) to process via Cloud API.")
            
            for index, path in enumerate(new_image_paths):
                image_name = os.path.basename(path)
                
                overall_index = len(processed_images) + index
                image_id = f"IMG_{overall_index + 1:04d}"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                batch_number = (overall_index // 5) + 1
                
                print(f" -> [{image_id}] Sending to Cloud: {image_name} | Batch: {batch_number}")
                
                predictions_list = []
                try:
                    # Execute secure hosted web request evaluation
                    result = client.infer(path, model_id=MODEL_ID)
                    predictions_list = result.get("predictions", [])
                except Exception as cloud_err:
                    print(f" ❌ Web Request API Error on {image_name}: {cloud_err}")
                
                # Prevent getting stuck: quarantine empty responses so they skip on next loop pass
                if not predictions_list:
                    predictions_list = [{"class": "None", "confidence": 0.0, "x": 0, "y": 0, "width": 0, "height": 0}]
                
                try:
                    df_temp = pd.DataFrame(predictions_list)
                    df_temp["image_id"] = image_id
                    df_temp["image_name"] = image_name
                    df_temp["timestamp"] = timestamp
                    df_temp["batch_number"] = batch_number
                    
                    base_columns = ["batch_number", "image_id", "image_name", "timestamp", "class", "confidence", "x", "y", "width", "height"]
                    final_columns = [col for col in base_columns if col in df_temp.columns]
                    df_temp = df_temp[final_columns]
                    
                    file_exists = os.path.isfile(OUTPUT_CSV)
                    df_temp.to_csv(OUTPUT_CSV, mode="a", index=False, header=not file_exists)
                    print(f" 💾 Safely appended {image_name} records to CSV via Cloud.")
                except Exception as csv_err:
                    print(f" ❌ DataFrame File Build Failure: {csv_err}")

        time.sleep(POLL_INTERVAL_SECONDS)

except KeyboardInterrupt:
    print("\n🛑 Cloud monitoring script paused manually.")
