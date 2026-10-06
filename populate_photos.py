import os
import shutil
import urllib.request
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = r"c:\Users\komal\Downloads\OpenWithLove_Birthday_B4"
PHOTOS_DIR = os.path.join(BASE_DIR, "photos")
BRAIN_DIR = r"C:\Users\komal\.gemini\antigravity-ide\brain\0bb46482-821e-40d8-908f-e73cfd6483ae"

childhood_dir = os.path.join(PHOTOS_DIR, "childhood")
single_dir = os.path.join(PHOTOS_DIR, "single")
together_dir = os.path.join(PHOTOS_DIR, "together")

for d in [childhood_dir, single_dir, together_dir]:
    os.makedirs(d, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def create_fallback_card(target_path, title, subtitle, width=600, height=750, color_theme="pink"):
    img = Image.new("RGB", (width, height), "#fff0f5")
    draw = ImageDraw.Draw(img)
    
    # Soft romantic pastel gradient
    colors = {
        "pink": ((255, 235, 240), (255, 190, 210), (240, 150, 185)),
        "peach": ((255, 242, 235), (255, 215, 195), (245, 170, 150)),
        "lavender": ((250, 240, 255), (230, 205, 250), (200, 165, 235))
    }.get(color_theme, ((255, 235, 240), (255, 190, 210), (240, 150, 185)))
    
    c1, c2, c3 = colors
    for y in range(height):
        ratio = y / height
        if ratio < 0.5:
            r = int(c1[0] + (c2[0] - c1[0]) * (ratio * 2))
            g = int(c1[1] + (c2[1] - c1[1]) * (ratio * 2))
            b = int(c1[2] + (c2[2] - c1[2]) * (ratio * 2))
        else:
            r = int(c2[0] + (c3[0] - c2[0]) * ((ratio - 0.5) * 2))
            g = int(c2[1] + (c3[1] - c2[1]) * ((ratio - 0.5) * 2))
            b = int(c2[2] + (c3[2] - c2[2]) * ((ratio - 0.5) * 2))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # Draw soft inner border
    margin = 25
    draw.rectangle([margin, margin, width - margin, height - margin], outline=(255, 255, 255, 180), width=3)
    
    # Decorative camera/heart frame in center
    cx, cy = width // 2, height // 2 - 40
    draw.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=(255, 255, 255), outline=(220, 130, 160), width=2)
    
    # Text
    draw.text((cx, cy), "♡", fill=(200, 80, 120), anchor="mm")
    draw.text((cx, cy + 110), title, fill=(130, 45, 75), anchor="mm")
    draw.text((cx, cy + 145), subtitle, fill=(170, 95, 125), anchor="mm")
    draw.text((cx, height - 55), "Open With Love • Birthday Special", fill=(190, 130, 155), anchor="mm")
    
    img.save(target_path, "JPEG", quality=90)

def download_and_save(url, target_path, width=700, height=850):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as response:
            data = response.read()
            temp_path = target_path + ".tmp"
            with open(temp_path, "wb") as f:
                f.write(data)
            
            with Image.open(temp_path) as im:
                im = im.convert("RGB")
                # Center crop and resize
                aspect_target = width / height
                aspect_im = im.width / im.height
                if aspect_im > aspect_target:
                    # image is wider
                    new_w = int(im.height * aspect_target)
                    left = (im.width - new_w) // 2
                    im = im.crop((left, 0, left + new_w, im.height))
                else:
                    # image is taller
                    new_h = int(im.width / aspect_target)
                    top = (im.height - new_h) // 2
                    im = im.crop((0, top, im.width, top + new_h))
                
                im = im.resize((width, height), Image.Resampling.LANCZOS)
                im.save(target_path, "JPEG", quality=88)
            
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return True
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return False

def copy_or_optimize(source_path, target_path, width=700, height=850):
    try:
        with Image.open(source_path) as im:
            im = im.convert("RGB")
            aspect_target = width / height
            aspect_im = im.width / im.height
            if aspect_im > aspect_target:
                new_w = int(im.height * aspect_target)
                left = (im.width - new_w) // 2
                im = im.crop((left, 0, left + new_w, im.height))
            else:
                new_h = int(im.width / aspect_target)
                top = (im.height - new_h) // 2
                im = im.crop((0, top, im.width, top + new_h))
            
            im = im.resize((width, height), Image.Resampling.LANCZOS)
            im.save(target_path, "JPEG", quality=90)
        return True
    except Exception as e:
        print(f"Error copying {source_path}: {e}")
        return False

# 1. Childhood Photos (8 photos)
childhood_ai_sources = {
    1: os.path.join(BRAIN_DIR, "childhood_photo_hero_1791213155119.jpg"),
    2: os.path.join(BRAIN_DIR, "childhood_sisters_memories_1791213205641.jpg")
}

childhood_unsplash = {
    3: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=700&auto=format&fit=crop&q=80", # sweet baby girl smile
    4: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&auto=format&fit=crop&q=80", # little girl with flowers
    5: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=700&auto=format&fit=crop&q=80", # little girl laughing in garden
    6: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&auto=format&fit=crop&q=80", # childhood smile
    7: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?w=700&auto=format&fit=crop&q=80", # cute toddler playing
    8: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=700&auto=format&fit=crop&q=80"  # joyful young child
}

print("Setting up Childhood Photos...")
for i in range(1, 9):
    tgt = os.path.join(childhood_dir, f"child{i}.jpeg")
    success = False
    if i in childhood_ai_sources and os.path.exists(childhood_ai_sources[i]):
        success = copy_or_optimize(childhood_ai_sources[i], tgt, 750, 750)
        print(f"Childhood {i}: AI Hero image used")
    elif i in childhood_unsplash:
        success = download_and_save(childhood_unsplash[i], tgt, 750, 750)
        print(f"Childhood {i}: Downloaded Unsplash image -> {success}")
    if not success:
        create_fallback_card(tgt, f"Childhood Memory #{i}", "The sweetest days of our lives ✨", 750, 750, "pink")
        print(f"Childhood {i}: Fallback card generated")

# 2. Together Photos (16 photos: pol1 to pol16)
together_ai_sources = {
    1: os.path.join(BRAIN_DIR, "sisters_together_candid_1791213227296.jpg"),
    16: os.path.join(BRAIN_DIR, "special_sister_photo_1791213131901.jpg") # SPECIAL MEMORY PHOTO
}

together_unsplash = {
    2: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&auto=format&fit=crop&q=80", # sisters/friends laughing in sun
    3: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&auto=format&fit=crop&q=80", # celebrating together
    4: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&auto=format&fit=crop&q=80", # sparklers together
    5: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=700&auto=format&fit=crop&q=80", # smiling together
    6: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=700&auto=format&fit=crop&q=80", # laughing together
    7: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=700&auto=format&fit=crop&q=80", # travel together
    8: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&auto=format&fit=crop&q=80", # sharing food/picnic
    9: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700&auto=format&fit=crop&q=80", # carefree joy
    10: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&auto=format&fit=crop&q=80", # sweet duo
    11: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=700&auto=format&fit=crop&q=80", # adventure
    12: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=700&auto=format&fit=crop&q=80", # hugging
    13: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80", # candid fun
    14: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=80", # smiles
    15: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80"  # sisters bond
}

print("\nSetting up Together Photos (pol1 to pol16)...")
for i in range(1, 17):
    tgt = os.path.join(together_dir, f"pol{i}.jpeg")
    success = False
    if i in together_ai_sources and os.path.exists(together_ai_sources[i]):
        success = copy_or_optimize(together_ai_sources[i], tgt, 700, 850)
        print(f"Together {i}: AI Hero image used (Special={i==16})")
    elif i in together_unsplash:
        success = download_and_save(together_unsplash[i], tgt, 700, 850)
        print(f"Together {i}: Downloaded Unsplash image -> {success}")
    if not success:
        sub = "Our Forever Special Memory ❤️" if i == 16 else "Moments made sweeter with you 💕"
        create_fallback_card(tgt, f"Together Memory #{i}" if i != 16 else "Our Special Memory", sub, 700, 850, "lavender")
        print(f"Together {i}: Fallback card generated")

# 3. Single / Her Journey Photos (36 photos: single1 to single36)
single_ai_sources = {
    1: os.path.join(BRAIN_DIR, "single_photo_hero_1791213177413.jpg"),
    2: os.path.join(BRAIN_DIR, "single_photo_travel_1791213248453.jpg")
}

single_unsplash_ids = [
    "photo-1494790108377-be9c29b29330",
    "photo-1517841905240-472988babdf9",
    "photo-1534528741775-53994a69daeb",
    "photo-1524504388940-b1c1722653e1",
    "photo-1544005313-94ddf0286df2",
    "photo-1509967419530-da38b4704bc6",
    "photo-1488426862026-3ee34a7d66df",
    "photo-1529626455594-4ff0802cfb7e",
    "photo-1514315384763-ba401779410f",
    "photo-1519741497674-611481863552",
    "photo-1520813792240-56fc4a3765a7",
    "photo-1531746020798-e6953c6e8e04",
    "photo-1531123897727-8f129e1688ce",
    "photo-1526510747491-58f928ec870f",
    "photo-1502823403499-6ccfcf4fb453",
    "photo-1527736947477-2790e28f3443",
    "photo-1517677208171-0bc6725a3e60",
    "photo-1524250502761-1ac6f2e30d43",
    "photo-1535713875002-d1d0cf377fde",
    "photo-1506794778202-cad84cf45f1d",
    "photo-1541257710737-06d667133a53",
    "photo-1516585427167-9f4af9627e6c",
    "photo-1526413232644-8a40f08ccb65",
    "photo-1519699047748-de8e457a634e",
    "photo-1523824921871-d6f1a15151f1",
    "photo-1513258496099-48168024aec0",
    "photo-1529139574466-a303027c1d8b",
    "photo-1529156069898-49953e39b3ac",
    "photo-1517841905240-472988babdf9",
    "photo-1534528741775-53994a69daeb",
    "photo-1524504388940-b1c1722653e1",
    "photo-1544005313-94ddf0286df2",
    "photo-1508214751196-bcfd4ca60f91",
    "photo-1494790108377-be9c29b29330"
]

print("\nSetting up Single Photos (single1 to single36)...")
for i in range(1, 37):
    tgt = os.path.join(single_dir, f"single{i}.jpeg")
    success = False
    if i in single_ai_sources and os.path.exists(single_ai_sources[i]):
        success = copy_or_optimize(single_ai_sources[i], tgt, 650, 750)
        print(f"Single {i}: AI Hero image used")
    else:
        idx = (i - 3) % len(single_unsplash_ids)
        photo_id = single_unsplash_ids[idx]
        url = f"https://images.unsplash.com/{photo_id}?w=650&auto=format&fit=crop&q=80"
        success = download_and_save(url, tgt, 650, 750)
        print(f"Single {i}: Downloaded Unsplash image -> {success}")
    if not success:
        create_fallback_card(tgt, f"Her Journey #{i}", "Radiant, beautiful and uniquely her ✨", 650, 750, "peach")
        print(f"Single {i}: Fallback card generated")

print("\nAll photos successfully processed and populated!")
