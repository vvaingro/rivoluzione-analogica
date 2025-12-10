# Analog Revolution

A high-performance photography portfolio built with modern web technologies, focusing on intelligent image management and a premium user experience.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Image Processing**: `sharp` (custom Node.js scripts)
- **Language**: TypeScript

## 🚀 Development Journey & Features

Here is a synthesized log of the development steps and features implemented so far:

### Phase 1: Foundation & Image System
- **Image Optimization**: Implemented automated scripts to handle AVIF conversion and optimization using `sharp`.
- **Intelligent Sorting**: Created a Node.js script (`scripts/organize-images.mjs`) that automatically analyzes images:
  - **Color Detection**: Routes images to `bnw` (Black & White) or `color` directories.
  - **Orientation Detection**: Sorts images into `landscape` or `portrait` subdirectories based on aspect ratio.
  - **Watch Mode**: Added a watcher (`npm run organize:watch`) to organize new files instantly as they are added.

### Phase 2: Core Gallery Experience
- **Dynamic Context**: Built a `GalleryContext` to manage the complex state of image collections and viewing modes.
- **Collection Switching**: Implemented smooth transitions between "Black & White" and "Color" collections.
- **Smart Layouts**:
  - **Desktop**: Toggle between viewing Landscape or Portrait oriented images.
  - **Mobile**: Automatic detection of device orientation to show the appropriate image set.
  - **Image Fitting**: Intelligent `object-fit` logic (switching between `cover` and `contain`) to ensure portrait images are viewed correctly on landscape screens without cropping.

### Phase 3: UI/UX Refinement
- **Responsive Header**: Implemented an "Auto-Hide" header for mobile portrait mode to maximize screen real estate (hides on scroll down, reveals on scroll up).
- **Parallax Effects**: Added subtle parallax scrolling for a more dynamic feel.
- **Minimalist Design**: Refined UI controls to use clean, text-free iconography for orientation toggles.
- **Keyboard Navigation**: (Planned/In-progress) Support for arrow key navigation through collections.

## 📂 Project Structure & Image System

Images are automatically structured as follows:

```
public/images/avif/
├── bnw/
│   ├── landscape/
│   └── portrait/
└── color/
    ├── landscape/
    └── portrait/
```

See [IMAGE_SYSTEM.md](./IMAGE_SYSTEM.md) for detailed documentation on the image pipeline.

## ⚡ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Organize your images:**
   Place images in `public/images/avif/bnw` or `public/images/avif/color` and run:
   ```bash
   npm run organize
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Development Watch Mode:**
   To keep images organized while you work:
   ```bash
   npm run organize:watch
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
