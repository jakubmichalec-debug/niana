import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'niana', 'photos')
const OUT = path.join(__dirname, '..', 'public', 'images')

// Each job crops the source to a target aspect ratio around a focal point
// (fx, fy as 0..1 fractions of the croppable slack), then resizes to a max
// width and writes a compressed JPEG. Focal points for hero/bordova/
// malinova/olivova/modra reuse the crops the brand owner already vetted in
// niana/91c33359-.../tool-results/update_photos.py; denim/collage/about are
// new selections for this build.
const jobs = [
  { key: 'hero', src: 'header.png', ratio: [1, 1], focal: [0.5, 0.5], width: 900 },
  { key: 'bordova', src: 'image00013.jpeg', ratio: [4, 5], focal: [0.5, 0.40], width: 800 },
  { key: 'bordova-detail', src: 'image00006.jpeg', ratio: [1, 1], focal: [0.5, 0.5], width: 700 },
  { key: 'malinova', src: 'image00101.jpeg', ratio: [4, 5], focal: [0.5, 0.5], width: 800 },
  { key: 'malinova-detail', src: 'image00100.jpeg', ratio: [1, 1], focal: [0.5, 0.35], width: 700 },
  { key: 'olivova', src: 'image00077.jpeg', ratio: [4, 5], focal: [0.35, 0.6], width: 800 },
  { key: 'olivova-detail', src: 'image00090.jpeg', ratio: [1, 1], focal: [0.5, 0.3], width: 700 },
  { key: 'modra', src: 'image00002.jpeg', ratio: [4, 5], focal: [0.4, 0.5], width: 800 },
  { key: 'modra-detail', src: 'image00002.jpeg', ratio: [1, 1], focal: [0.55, 0.75], width: 700 },
  { key: 'denim', src: 'Denim bag.jpg', ratio: [4, 5], focal: [0.5, 0.35], width: 800 },
  { key: 'denim-detail', src: 'Denim bag.jpg', ratio: [1, 1], focal: [0.6, 0.55], width: 700 },
  { key: 'collage-1', src: 'image00090.jpeg', ratio: [3, 4], focal: [0.5, 0.3], width: 700 },
  { key: 'collage-2', src: 'image00096.jpeg', ratio: [3, 4], focal: [0.5, 0.45], width: 700 },
  { key: 'collage-3', src: 'image00100.jpeg', ratio: [3, 4], focal: [0.5, 0.35], width: 700 },
  { key: 'about-studio', src: 'image00077.jpeg', ratio: [4, 5], focal: [0.6, 0.5], width: 900 },
  // New arrivals strip — from niana/photos/NewArrivals/, cropped to the
  // same 4:5 ratio and output width as every other product photo so the
  // cards in the loop are genuinely uniform, not just visually close.
  { key: 'arrival-azurova', src: 'NewArrivals/image00010.jpeg', ratio: [4, 5], focal: [0.5, 0.55], width: 800 },
  { key: 'arrival-ladova', src: 'NewArrivals/image00014.jpeg', ratio: [4, 5], focal: [0.5, 0.6], width: 800 },
  { key: 'arrival-nocna', src: 'NewArrivals/image00016.jpeg', ratio: [4, 5], focal: [0.45, 0.55], width: 800 },
  { key: 'arrival-snehova', src: 'NewArrivals/image00099.jpeg', ratio: [4, 5], focal: [0.5, 0.55], width: 800 },
  { key: 'arrival-denim', src: 'NewArrivals/Denim bag.jpg', ratio: [4, 5], focal: [0.5, 0.5], width: 800 },
]

async function cropToRatio(image, [aw, ah], [fx, fy]) {
  const meta = await image.metadata()
  const w = meta.width
  const h = meta.height
  const targetRatio = aw / ah
  const curRatio = w / h
  let newW
  let newH
  if (curRatio > targetRatio) {
    newH = h
    newW = Math.round(h * targetRatio)
  } else {
    newW = w
    newH = Math.round(w / targetRatio)
  }
  const maxX = w - newW
  const maxY = h - newH
  const left = Math.max(0, Math.round(maxX * fx))
  const top = Math.max(0, Math.round(maxY * fy))
  return image.extract({ left, top, width: newW, height: newH })
}

async function run() {
  await mkdir(OUT, { recursive: true })
  for (const job of jobs) {
    const input = path.join(SRC, job.src)
    const { hasAlpha } = await sharp(input).metadata()
    let image = sharp(input).rotate()
    image = await cropToRatio(image, job.ratio, job.focal)
    image = image.resize({ width: job.width })

    // Preserve real transparency (the new header.png studio shot has an
    // alpha channel) as PNG; JPEG has no alpha and would otherwise flatten
    // it onto an opaque black background. Everything else here is a real
    // photo with no alpha, so JPEG stays the right call for those.
    const ext = hasAlpha ? 'png' : 'jpg'
    if (hasAlpha) {
      image = image.png({ quality: 90 })
    } else {
      image = image.jpeg({ quality: 80, mozjpeg: true })
    }
    await image.toFile(path.join(OUT, `${job.key}.${ext}`))
    console.log('wrote', `${job.key}.${ext}`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
