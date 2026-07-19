import os
import re

# Directory to scan
src_dir = "src"

# Regular expressions to match Cloudinary URLs
# Group 1 will be the filename at the end of the URL
image_pattern = re.compile(
    r'https://res\.cloudinary\.com/[^/]+/image/upload/v\d+/([^"\'\s`<>\)]+)'
)
video_pattern = re.compile(
    r'https://res\.cloudinary\.com/[^/]+/video/upload/v\d+/([^"\'\s`<>\)]+)'
)

# Walk through src directory
modified_files = 0
total_replacements = 0

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            new_content = content
            replacements = 0

            # Find all image matches
            matches_img = image_pattern.findall(content)
            for img_name in matches_img:
                old_url = f"https://res.cloudinary.com/oglqwvqq/image/upload/v"
                # Search for the full URL matching this filename
                full_pattern = rf'https://res\.cloudinary\.com/[^/]+/image/upload/v\d+/{re.escape(img_name)}'
                new_path = f"/cloudinary-assets/images/{img_name}"
                new_content, count = re.subn(full_pattern, new_path, new_content)
                replacements += count

            # Find all video matches
            matches_vid = video_pattern.findall(content)
            for vid_name in matches_vid:
                full_pattern = rf'https://res\.cloudinary\.com/[^/]+/video/upload/v\d+/{re.escape(vid_name)}'
                new_path = f"/cloudinary-assets/videos/{vid_name}"
                new_content, count = re.subn(full_pattern, new_path, new_content)
                replacements += count

            if replacements > 0:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {file_path}: made {replacements} replacement(s)")
                modified_files += 1
                total_replacements += replacements

print(f"\nDone. Modified {modified_files} file(s) with {total_replacements} total replacement(s).")
