import urllib.request
import re
import subprocess
import os

video_ids = [
    ("fields", "4909852", "https://www.pexels.com/fr-fr/video/paysage-nature-clairiere-ete-4909852/"),
    ("story", "31632105", "https://www.pexels.com/fr-fr/video/campo-hidalgo-31632105/"),
    ("sourcing", "9894605", "https://www.pexels.com/fr-fr/video/paysage-nature-se-relaxer-feuilles-9894605/"),
    ("products", "19733034", "https://www.pexels.com/fr-fr/video/lagon-taureau-vache-cheval-19733034/"),
    ("food-boxes", "29642601", "https://www.pexels.com/fr-fr/video/un-drone-survole-des-terres-agricoles-avec-des-montagnes-au-loin-29642601/"),
    ("impact", "34432162", "https://www.pexels.com/fr-fr/video/vue-aerienne-de-moutons-paissant-dans-un-champ-ouvert-34432162/"),
    ("media", "12060115", "https://www.pexels.com/fr-fr/video/nature-clairiere-arbres-campagne-12060115/"),
    ("contact", "27595075", "https://www.pexels.com/fr-fr/video/bois-ville-route-paysage-27595075/"),
]

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

os.makedirs("public/videos", exist_ok=True)

for name, vid_id, page_url in video_ids:
    print(f"Checking {name} (ID {vid_id})...")
    try:
        req = urllib.request.Request(page_url, headers=headers)
        html = urllib.request.urlopen(req).read().decode("utf-8")
        
        # Look for video URLs in pexels page source
        matches = re.findall(r"https://videos\.pexels\.com/video-files/[0-9]+/[^\"\'<>\s]+\.mp4", html)
        if not matches:
            matches = re.findall(r"https://[^\s\"\'<>]*\.mp4[^\s\"\'<>]*", html)
            
        if matches:
            # Pick HD or 720p or 1080p
            hd_matches = [m for m in matches if ("hd" in m or "1080" in m or "720" in m) and "mobile" not in m]
            chosen = hd_matches[0] if hd_matches else matches[0]
            chosen = chosen.split("&")[0].split("\"")[0].split("\'")[0]
            print(f"  Downloading from: {chosen}")
            
            raw_tmp = f"/tmp/{name}_pexels.mp4"
            req_dl = urllib.request.Request(chosen, headers=headers)
            with urllib.request.urlopen(req_dl) as resp, open(raw_tmp, "wb") as f:
                f.write(resp.read())
                
            out_mp4 = f"public/videos/{name}.mp4"
            out_jpg = f"public/videos/{name}.jpg"
            
            # Trim to 10s, scale to 1280 wide, faststart, no audio
            subprocess.run([
                "ffmpeg", "-y", "-ss", "0", "-i", raw_tmp, "-t", "10",
                "-vf", "scale=1280:-2", "-an", "-vcodec", "libx264", "-crf", "25",
                "-preset", "fast", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                out_mp4
            ], check=True)
            
            # Extract poster frame at 1s
            subprocess.run([
                "ffmpeg", "-y", "-ss", "1", "-i", out_mp4, "-vframes", "1",
                "-q:v", "2", out_jpg
            ], check=True)
            
            if os.path.exists(raw_tmp):
                os.remove(raw_tmp)
            print(f"  SUCCESS: Generated {out_mp4} & {out_jpg}")
        else:
            print(f"  No MP4 download URL found for ID {vid_id}")
    except Exception as e:
        print(f"  Error processing {name}: {e}")

print("Done processing Pexels videos!")
