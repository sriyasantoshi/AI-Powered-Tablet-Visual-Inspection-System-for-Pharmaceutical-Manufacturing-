const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const refreshBtn = document.getElementById('refreshBtn');
const gallery = document.getElementById('gallery');
const imageCount = document.getElementById('imageCount');
const uploadZone = document.querySelector('.upload-zone');

let selectedFiles = [];

// File input change
fileInput.addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
    console.log(`Selected ${selectedFiles.length} file(s)`);
});

// Drag and drop
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    selectedFiles = Array.from(e.dataTransfer.files);
    console.log(`Dropped ${selectedFiles.length} file(s)`);
});

// Upload button
uploadBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        showMessage('Please select images to upload', 'error');
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = ' Uploading...';

    try {
        for (const file of selectedFiles) {
            if (!file.type.startsWith('image/')) {
                continue;
            }

            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Failed to upload ${file.name}`);
            }
        }

        showMessage(`Uploaded ${selectedFiles.length} image${selectedFiles.length !== 1 ? 's' : ''}`, 'success');
        selectedFiles = [];
        fileInput.value = '';
        loadGallery();
    } catch (error) {
        showMessage(`Upload error: ${error.message}`, 'error');
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload';
    }
});

// Refresh button
refreshBtn.addEventListener('click', loadGallery);

// Load gallery
async function loadGallery() {
    try {
        gallery.innerHTML = '<div class="loading">Loading...</div>';

        const response = await fetch('/api/images');
        if (!response.ok) {
            throw new Error('Failed to load images');
        }

        const data = await response.json();
        const images = data.images;

        imageCount.textContent = `${images.length} image${images.length !== 1 ? 's' : ''}`;

        if (images.length === 0) {
            gallery.innerHTML = '<div class="empty">No images yet. Upload some to get started!</div>';
            gallery.classList.add('empty');
            return;
        }

        gallery.classList.remove('empty');
        gallery.innerHTML = images.map(img => `
            <div class="image-card">
                <div class="image-container">
                    <img src="/api/image/${encodeURIComponent(img)}" alt="${img}" loading="lazy">
                </div>
                <div class="image-info">
                    <div class="image-name">${img}</div>
                    <div class="image-actions">
                        <a href="/api/image/${encodeURIComponent(img)}" download="${img}" class="btn-action btn-download">Download</a>
                        <button class="btn-action btn-delete" onclick="deleteImage('${img}')">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        gallery.innerHTML = `<div class="error">Failed to load images: ${error.message}</div>`;
    }
}

// Delete image
async function deleteImage(filename) {
    if (!confirm(`Delete ${filename}?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/image/${encodeURIComponent(filename)}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete image');
        }

        showMessage('Image deleted successfully', 'success');
        loadGallery();
    } catch (error) {
        showMessage(`Delete error: ${error.message}`, 'error');
    }
}

// Show message
function showMessage(message, type) {
    const div = document.createElement('div');
    div.className = type;
    div.textContent = message;
    gallery.parentElement.insertBefore(div, gallery);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Load gallery on page load
document.addEventListener('DOMContentLoaded', loadGallery);
