import urllib.request
import urllib.error

urls = [
    "https://bloodnexusstudio.in/otassets/VR-bg_uqw3k8.png",
    "https://bloodnexusstudio.in/otassets/48c6bc10-99a6-46cb-9621-39e34ee5beb6.png"
]

for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        print(f"Success: {url} -> {res.geturl()}")
    except urllib.error.HTTPError as e:
        print(f"Failed: {url} -> Final URL: {e.url} (Code: {e.code})")
    except Exception as e:
        print(f"Error checking {url}: {e}")
