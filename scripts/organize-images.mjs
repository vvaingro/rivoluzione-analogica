#!/usr/bin/env node

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

// Configuration
const CONFIG = {
    quality: 60,
    effort: 4, // 0-9, higher is slower but better compression
}

const BASE_DIR = path.join(process.cwd(), 'public', 'images', 'avif')
const CATEGORIES = ['bnw', 'color']

/**
 * Determines image orientation and ensures file is processed.
 * @param {string} filePath 
 * @returns {Promise<{orientation: 'landscape'|'portrait', width: number, height: number}>}
 */
async function analyzeImage(filePath) {
    const metadata = await sharp(filePath).metadata()
    return {
        orientation: metadata.width > metadata.height ? 'landscape' : 'portrait',
        width: metadata.width,
        height: metadata.height
    }
}

async function organizeImages() {
    console.log('🎨 Starting Bulletproof Image Organization...')
    console.log(`⚙️  AVIF Settings: Quality ${CONFIG.quality}, Effort ${CONFIG.effort}`)
    console.log(`📂 Base Directory: ${BASE_DIR}\n`)

    for (const category of CATEGORIES) {
        const categoryPath = path.join(BASE_DIR, category)

        // Ensure category directory exists, skip if not
        try {
            await fs.access(categoryPath)
        } catch {
            console.warn(`⚠️  Category not found: ${category}. Skipping.`)
            continue
        }

        console.log(`🔹 Processing category: ${category}`)

        // Create target directories
        const landscapePath = path.join(categoryPath, 'landscape')
        const portraitPath = path.join(categoryPath, 'portrait')

        await fs.mkdir(landscapePath, { recursive: true })
        await fs.mkdir(portraitPath, { recursive: true })

        // Read files
        let files = []
        try {
            files = await fs.readdir(categoryPath)
        } catch (err) {
            console.error(`❌ Failed to read directory ${categoryPath}:`, err.message)
            continue
        }

        const imageFiles = files.filter(f => f.match(/\.(avif|jpg|jpeg|png|webp)$/i))
        console.log(`   Found ${imageFiles.length} images to process...`)

        let successCount = 0
        let failCount = 0

        for (const file of imageFiles) {
            const filePath = path.join(categoryPath, file)

            try {
                // 1. Analyze
                const stats = await fs.stat(filePath)
                const sizeMB = stats.size / (1024 * 1024)

                // Warn if file is too heavy (> 2.5MB is a good threshold for "Giant")
                if (sizeMB > 2.5) {
                    console.warn(`   ⚠️  GIANT FILE DETECTED: ${file} is ${sizeMB.toFixed(2)}MB`)
                    console.warn(`       -> Consider re-exporting from Lightroom (Long Edge 2500px, Quality 70)`)
                }

                const { orientation } = await analyzeImage(filePath)

                // 2. Determine paths
                const targetDir = orientation === 'landscape' ? landscapePath : portraitPath
                const fileExt = path.extname(file).toLowerCase()
                const fileNameNoExt = path.basename(file, fileExt)
                const targetFilename = `${fileNameNoExt}.avif` // Always target AVIF
                const targetPath = path.join(targetDir, targetFilename)

                // 3. Process
                // If it's already AVIF, just move it (efficient)
                // If it's not AVIF, convert it (optimization)

                if (fileExt === '.avif') {
                    // Bypass re-compression for Master AVIFs
                    // Use fs.rename (move) to preserve exact bits
                    await fs.rename(filePath, targetPath)
                    console.log(`   📦 Preserved Master: ${file} -> ${orientation}/ (No re-compression)`)
                } else {
                    // Convert & Optimize legacy formats (JPG/PNG)
                    await sharp(filePath)
                        .avif({ quality: CONFIG.quality, effort: CONFIG.effort })
                        .toFile(targetPath)

                    // Remove original after successful conversion
                    await fs.unlink(filePath)
                    console.log(`   ✨ Converted: ${file} -> ${orientation}/${targetFilename}`)
                }

                successCount++

            } catch (error) {
                console.error(`   ❌ Failed: ${file} - ${error.message}`)
                failCount++
                // Continue to next file (Bulletproof)
            }
        }

        console.log(`   Summary for ${category}: ${successCount} processed, ${failCount} failed.\n`)
    }

    console.log('🚀 All operations complete.')
}

// Check for watch flag
const args = process.argv.slice(2)
if (args.includes('--watch') || args.includes('-w')) {
    console.log('❌ Watch mode is temporarily disabled in Bulletproof mode to prevent sorting loops.')
    // Implementation note: Watch mode requires debounce logic to avoiding sorting the file we just wrote.
    // For now, running single-pass as requested.
}

organizeImages().catch(err => {
    console.error('🔥 Fatal Error:', err)
    process.exit(1)
})
