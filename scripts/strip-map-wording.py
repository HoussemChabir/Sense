"""Remove the title banners from the region illustrations and fade their bottoms.

Usage: python scripts/strip-map-wording.py <src_dir_with_3..8.png> <out_dir>
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

# file -> (key, text box x0,y0,x1,y1, fade start, fade end)
JOBS = {
    3: ('island',  (330, 860, 960, 1130), 880, 1000),
    4: ('sahara',  (320, 800, 1010, 1110), 900, 1030),
    5: ('oasis',   (260, 860, 980, 1130), 860, 975),
    6: ('history', (130, 850, 1080, 1090), 870, 985),
    7: ('coast',   (150, 830, 1080, 1160), 930, 1040),
    8: ('north',   (300, 780, 950, 1045), 820, 940),
}

def inpaint(rgb, mask, iters=400):
    """Harmonic fill: repeatedly replace masked pixels with the mean of their neighbours."""
    out = rgb.copy()
    known = (~mask).astype(float)
    out[mask] = 0
    # seed with a normalised wide blur so iteration converges fast
    for c in range(3):
        num = ndimage.gaussian_filter(out[..., c] * known, 25)
        den = ndimage.gaussian_filter(known, 25) + 1e-6
        out[..., c][mask] = (num / den)[mask]
    k = np.array([[0, 1, 0], [1, 0, 1], [0, 1, 0]]) / 4
    for _ in range(iters):
        for c in range(3):
            out[..., c][mask] = ndimage.convolve(out[..., c], k, mode='nearest')[mask]
    return out

def process(src, key, box, f0, f1, rng):
    a = np.array(Image.open(src).convert('RGBA')).astype(float)
    rgb, al = a[..., :3], a[..., 3]
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    x0, y0, x1, y1 = box
    inbox = np.zeros(al.shape, bool); inbox[y0:y1, x0:x1] = True
    text = inbox & (al > 40) & (r > 100) & (g < 95) & (b < 100) & (r - g > 60) & (r - b > 55)
    text = ndimage.binary_dilation(text, iterations=4) & inbox
    rgb = inpaint(rgb, text)
    # ragged, noise-modulated fade instead of a ruler-straight cut
    h, w = al.shape
    ys = np.arange(h)[:, None].astype(float)
    wobble = ndimage.gaussian_filter1d(rng.normal(0, 1, w), 18)
    wobble = wobble / (np.abs(wobble).max() + 1e-6) * 22
    t = np.clip((ys - (f0 + wobble[None, :])) / (f1 - f0), 0, 1)
    al = al * (1 - t * t * (3 - 2 * t))
    al = ndimage.grey_erosion(al, size=3)  # trim the reddish cut-out halo
    out = np.dstack([rgb, al]).clip(0, 255).astype(np.uint8)
    im = Image.fromarray(out, 'RGBA')
    return im.crop(im.getbbox())

if __name__ == '__main__':
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    dst.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(7)
    for n, (key, box, f0, f1) in JOBS.items():
        im = process(src / f'{n}.png', key, box, f0, f1, rng)
        im.save(dst / f'map-{key}.png')
        print(key, im.size)
    # logo and compass need no wording removal, only a tight crop (+ halo trim on the compass)
    for n, name, erode in ((1, 'logo', False), (2, 'compass', True)):
        im = Image.open(src / f'{n}.png').convert('RGBA')
        if erode:
            a = np.array(im); a[..., 3] = ndimage.grey_erosion(a[..., 3], size=5); im = Image.fromarray(a, 'RGBA')
        im.crop(im.getbbox()).save(dst / f'map-{name}.png')
