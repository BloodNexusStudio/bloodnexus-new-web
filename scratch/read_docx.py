import zipfile
import xml.etree.ElementTree as ET
import os
import sys

docx_path = r"C:\Users\hibar\OneDrive\Documents\bnweb\bloodnexus-new-web\BloodNexus_Website_Developer_Handoff (1).docx"

if not os.path.exists(docx_path):
    print(f"File not found: {docx_path}")
    exit(1)

with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read("word/document.xml")
    root = ET.fromstring(xml_content)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paragraphs = []
    
    # We want to preserve paragraphs and headers.
    for p in root.findall('.//w:p', ns):
        texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
        if texts:
            paragraphs.append("".join(texts))
        else:
            if len(paragraphs) > 0 and paragraphs[-1] != "":
                paragraphs.append("")
                
    output_text = "\n".join(paragraphs)
    
    # Write to a text file for convenience
    out_path = r"C:\Users\hibar\OneDrive\Documents\bnweb\bloodnexus-new-web\scratch\handoff_extracted.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(output_text)
    
    # Safely print to console using stdout.buffer
    sys.stdout.buffer.write(output_text.encode('utf-8', errors='replace'))
    print(f"\n\n[Saved to {out_path}]")
