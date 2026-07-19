import urllib.request
import urllib.error

asset_names = [
    # VR page
    "VR-bg_uqw3k8.png",
    "cbaec4f1-d8a7-402f-84cc-424f62491a24.png",
    "FamilyRoom_-_Copy_fcqzbg.jpg",
    "IMG-20250421-WA0025_mu7mlq.jpg",
    "IMG-20250421-WA0026_ubm637.jpg",
    "IMG-20250421-WA0024_kobxdb.jpg",
    "IMG-20250421-WA0022_mmd1oy.jpg",
    "IMG-20250421-WA0019_dydete.jpg",
    "6dc2726f-447c-40fd-9184-69d9f3dbe147.png",
    "ac1b28f6-bc0b-4660-b0c9-55e106966887.png",
    "cbf57e62-e045-42a0-b6d9-2060b4a0d454.png",
    
    # WebApp page
    "48c6bc10-99a6-46cb-9621-39e34ee5beb6.png",
    "71b176a7-2f8a-498b-b060-2d0fd3ed13d9.png",
    "e997db8e-f93f-4118-8dbe-1f3bc12f2d9f.png",
    "0c009dba-c4fc-48a5-8cd2-d5cf446c833b.png",
    "81c500d3-c6f1-40a1-b821-368f4e11f491.png",
    "25cf4ea0-5ad9-4869-b7fb-1c33e631b55e.png",
    "3a02916d-831e-4ccd-9ccd-e607810671ae.png",
    "48707790-3cf9-4b45-afd1-f35dbe11fc7e.png",
    "cea3d78a-fae7-4717-b884-1732f3082662.png"
]

cloud_name = "oglqwvqq"

# Permutations to try:
# 1. res.cloudinary.com/{cloud_name}/image/upload/{name}
# 2. res.cloudinary.com/{cloud_name}/image/upload/v1784025204/{name} (various known version numbers: v1784025204, v1784090567, v1783934510, v1784007690)
# 3. res.cloudinary.com/{cloud_name}/image/upload/otassets/{name}
# 4. res.cloudinary.com/{cloud_name}/image/upload/v1784025204/otassets/{name} (and other version numbers)

versions = ["", "v1784025204", "v1784090567", "v1783934510", "v1784007690", "v1784026328", "v1784090016", "v1784090566", "v1784026324", "v1784026326", "v1784007703", "v1784016507"]

print("Starting scan...")

for name in asset_names:
    found = False
    # Try different version and path combinations
    for version in versions:
        for path_prefix in ["", "otassets/"]:
            v_part = f"{version}/" if version else ""
            url = f"https://res.cloudinary.com/{cloud_name}/image/upload/{v_part}{path_prefix}{name}"
            
            # check URL
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            try:
                res = urllib.request.urlopen(req)
                if res.getcode() == 200:
                    print(f"FOUND: {name} -> {url}")
                    found = True
                    break
            except Exception:
                pass
        if found:
            break
    if not found:
        print(f"NOT FOUND: {name}")
