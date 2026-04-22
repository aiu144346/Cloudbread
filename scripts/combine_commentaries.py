import os
import json

def combine_commentaries():
    base_dir = r"c:\Users\곰탈쌤\CloudBread007\ai-expert-landing\assets\lectures"
    output_path = r"c:\Users\곰탈쌤\CloudBread007\ai-expert-landing\assets\commentaries_index.json"
    
    master_index = {}
    
    if not os.path.exists(base_dir):
        print(f"Directory not found: {base_dir}")
        return

    # Create target directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    folder_count = 0
    file_count = 0

    for folder_name in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder_name)
        if os.path.isdir(folder_path):
            folder_count += 1
            commentary_path = os.path.join(folder_path, "commentary.json")
            if os.path.exists(commentary_path):
                try:
                    with open(commentary_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        # Use NFC normalization for the key to match data.js IDs
                        import unicodedata
                        safe_id = unicodedata.normalize('NFC', folder_name)
                        master_index[safe_id] = data
                        file_count += 1
                except Exception as e:
                    print(f"Error reading {commentary_path}: {e}")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(master_index, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully combined {file_count} commentaries from {folder_count} folders.")
    print(f"Master index saved to: {output_path}")

if __name__ == "__main__":
    combine_commentaries()
