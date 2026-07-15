import re

file_path = r"C:\Users\Mayur\.gemini\antigravity\brain\fd638e3a-bb0d-44f3-b509-8e7adbaabf94\.system_generated\steps\2392\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Remove HTML tags to read clean text
clean_text = re.sub('<[^<]+?>', '', text)

# Print lines containing headers or lists or cost tables
lines = clean_text.split('\n')
output = []
for line in lines:
    line_strip = line.strip()
    if not line_strip:
        continue
    # capture headers and paragraphs with numbers
    if any(keyword in line_strip.lower() for keyword in ["cost", "price", "outsourcing", "rate", "model", "partner", "workflow"]):
        if len(line_strip) < 300:
            output.append(line_strip)

with open("scratch/clean_content.txt", "w", encoding="utf-8") as out:
    out.write("\n".join(output[:250]))

print("Done! Extracted first 250 matching lines.")
