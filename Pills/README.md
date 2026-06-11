# Image Browser Application

A simple, elegant web application for browsing and managing images stored locally in your "watcher" folder.

## Features

✨ **Image Gallery** - View all images in a responsive grid layout
📤 **Upload Images** - Drag and drop or click to upload multiple images
🗑️ **Delete Images** - Remove unwanted images with one click
⬇️ **Download Images** - Download images directly to your computer
🔄 **Real-time Refresh** - Auto-refresh gallery after uploads/deletions
📱 **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the project directory:
   ```bash
   cd Pills
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The application looks for images in:
```
C:\Users\[YourUsername]\OneDrive\Desktop\watcher
```

This folder is created automatically if it doesn't exist.

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at: **http://localhost:3000**

## How to Use

1. **View Images**: The gallery automatically loads all images from the watcher folder
2. **Upload Images**: 
   - Click the upload box or drag and drop image files
   - Click "Upload Images" button
3. **Download Images**: Click the download button on any image card
4. **Delete Images**: Click the delete button and confirm deletion
5. **Refresh**: Click the refresh button to reload the gallery

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

## API Endpoints

- `GET /api/images` - Get list of all images
- `GET /api/image/:filename` - Get specific image file
- `POST /api/upload` - Upload new image
- `DELETE /api/image/:filename` - Delete image

## Troubleshooting

**Port already in use?**
Edit `server.js` and change `const PORT = 3000;` to a different port number.

**Images not showing?**
- Ensure the watcher folder exists at `C:\Users\[YourUsername]\OneDrive\Desktop\watcher`
- Verify images are in supported formats

**Upload fails?**
- Check file size (should be reasonable image size)
- Verify file is a valid image format
- Check folder permissions

## License

ISC
