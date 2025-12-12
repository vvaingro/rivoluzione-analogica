
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const TARGET_WIDTH = 800; // Mobile retina quality
const QUALITY = 80;

async function processDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            // Only process image files we care about (AVIF/JPG/PNG)
            // And ignore already generated mobile variants
            if (!entry.name.match(/\.(avif|jpg|jpeg|png|webp)$/i) || entry.name.includes('_mobile')) {
                continue;
            }

            const ext = path.extname(entry.name);
            const name = path.basename(entry.name, ext);
            const mobilePath = path.join(dir, `${name}_mobile${ext}`);

            // Skip if mobile version exists and is newer
            // (Simple check, can be improved)
            if (fs.existsSync(mobilePath)) {
                // console.log(`Skipping ${entry.name}, mobile variant exists.`);
                continue;
            }

            try {
                console.log(`Optimizing: ${entry.name} -> ${path.basename(mobilePath)}`);
                await sharp(fullPath)
                    .resize(TARGET_WIDTH, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .toFile(mobilePath);
            } catch (error) {
                console.error(`Error processing ${entry.name}:`, error);
            }
        }
    }
}

console.log("Starting Mobile Image Optimization...");
processDirectory(IMAGES_DIR)
    .then(() => console.log("Optimization Complete!"))
    .catch(err => console.error("Fatal Error:", err));
