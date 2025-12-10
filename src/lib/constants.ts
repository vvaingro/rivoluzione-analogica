export const GALLERY_IMAGES = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    src: `/images/gallery/${i + 1}.jpg`, // Placeholder paths
    alt: `Analog Photography ${i + 1}`,
    // Dimensions can be added if known, otherwise we rely on standardizing or object-fit
}))
