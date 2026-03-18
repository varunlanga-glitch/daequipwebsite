import sharp from 'sharp'
import { readdir } from 'fs/promises'
import path from 'path'

const DOWNLOADS = 'C:/Users/varun/Downloads'
const OUT = 'C:/Users/varun/daequip-website/public/images'

// Map: source filename -> output name, width, quality
const images = {
  // Hero background - dramatic excavator at night
  'pexels-rozegold-2449603.jpg': { name: 'hero-bg.jpg', width: 1920, quality: 75 },

  // Product cards (600px wide)
  'pexels-trupert-25559747.jpg': { name: 'product-digging-buckets.jpg', width: 600, quality: 72 },
  'pexels-rezwan-1078884.jpg': { name: 'product-hydraulic-thumbs.jpg', width: 600, quality: 72 },
  'pexels-skraboys28-15743465.jpg': { name: 'product-long-reach.jpg', width: 600, quality: 72 },
  'pexels-pixabay-461789.jpg': { name: 'product-wl-buckets.jpg', width: 600, quality: 72 },
  'pexels-ywanphoto-129544.jpg': { name: 'product-wl-attachments.jpg', width: 600, quality: 72 },
  'pexels-readymade-3964831.jpg': { name: 'product-guarding.jpg', width: 600, quality: 72 },
  'pexels-arvid-knutsen-1892648-3510993.jpg': { name: 'product-dozer-adt.jpg', width: 600, quality: 72 },
  'pexels-kateryna-babaieva-1423213-2760343.jpg': { name: 'product-custom-fab.jpg', width: 600, quality: 72 },

  // Industries (400px)
  'pexels-connorscottmcmanus-11973732.jpg': { name: 'industry-construction.jpg', width: 400, quality: 70 },
  'pexels-tomfisk-2101137.jpg': { name: 'industry-mining.jpg', width: 400, quality: 70 },
  'pexels-tobiasbjorkli-2058729.jpg': { name: 'industry-forestry.jpg', width: 400, quality: 70 },
  'pexels-enrique72-15071423.jpg': { name: 'industry-oilgas.jpg', width: 400, quality: 70 },
  'pexels-manzil-joshi-2335395-3998410.jpg': { name: 'industry-landscaping.jpg', width: 400, quality: 70 },
  'pexels-ywanphoto-3089685.jpg': { name: 'industry-waste.jpg', width: 400, quality: 70 },

  // Services background - welding
  'pexels-tima-miroshnichenko-5846247.jpg': { name: 'services-bg.jpg', width: 1920, quality: 60 },

  // About section
  'pexels-parinduan-10048979.jpg': { name: 'about-hero.jpg', width: 800, quality: 72 },

  // Contact / fabrication
  'pexels-felipe-silva-1458994757-30431684.jpg': { name: 'contact-fab.jpg', width: 600, quality: 70 },

  // Additional dramatic shots
  'pexels-botanphotography-27434711.jpg': { name: 'excavator-bw.jpg', width: 800, quality: 72 },
  'pexels-animgraphlab-6479995.jpg': { name: 'excavator-lineup.jpg', width: 800, quality: 72 },
  'pexels-jordi-garcia-freixes-214984226-11825548.jpg': { name: 'excavator-bucket-detail.jpg', width: 600, quality: 72 },
  'pexels-parinduan-11209831.jpg': { name: 'mining-excavator.jpg', width: 800, quality: 72 },
  'pexels-kateryna-babaieva-1423213-2880871.jpg': { name: 'welding-closeup.jpg', width: 800, quality: 72 },
}

async function run() {
  let totalIn = 0, totalOut = 0

  for (const [src, opts] of Object.entries(images)) {
    const input = path.join(DOWNLOADS, src)
    const output = path.join(OUT, opts.name)
    try {
      const result = await sharp(input)
        .resize(opts.width, null, { withoutEnlargement: true })
        .jpeg({ quality: opts.quality, mozjpeg: true })
        .toFile(output)

      const inputSize = (await import('fs')).statSync(input).size
      totalIn += inputSize
      totalOut += result.size
      console.log(`✓ ${opts.name} — ${(inputSize/1024).toFixed(0)}KB → ${(result.size/1024).toFixed(0)}KB (${((1-result.size/inputSize)*100).toFixed(0)}% saved)`)
    } catch (err) {
      console.error(`✗ ${src}: ${err.message}`)
    }
  }

  console.log(`\nTotal: ${(totalIn/1024/1024).toFixed(1)}MB → ${(totalOut/1024/1024).toFixed(1)}MB`)
}

run()
