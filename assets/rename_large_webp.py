import os
import glob

# Set your assets folder path here
assets_path = "/Users/ryanvan/Documents/VS TEST/faithdoyle/assets"

# Find all webp files
webp_files = glob.glob(os.path.join(assets_path, "*.webp"))

print(f"Found {len(webp_files)} WebP files\n")

renamed = []
kept = []

for filepath in webp_files:
    size_bytes = os.path.getsize(filepath)
    size_kb = size_bytes / 1024

    if size_kb > 800:
        new_filepath = filepath.replace(".webp", ".jpg")
        os.rename(filepath, new_filepath)
        renamed.append((os.path.basename(filepath), round(size_kb / 1024, 2)))
        print(f"RENAMED: {os.path.basename(filepath)} → {os.path.basename(new_filepath)} ({round(size_kb/1024, 2)} MB)")
    else:
        kept.append((os.path.basename(filepath), round(size_kb, 1)))
        print(f"OK:      {os.path.basename(filepath)} ({round(size_kb, 1)} KB)")

print(f"\n--- Summary ---")
print(f"Renamed (too large): {len(renamed)}")
print(f"Kept as WebP:        {len(kept)}")
