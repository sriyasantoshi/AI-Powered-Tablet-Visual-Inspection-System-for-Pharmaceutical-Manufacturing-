const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Path to watcher folder
const WATCHER_PATH = path.join(process.env.USERPROFILE || '/home/user', 'Desktop', 'Sixth Semester', 'AI edge Intern', 'New folder'); // Adjust this path as needed

// Create watcher folder if it doesn't exist
if (!fs.existsSync(WATCHER_PATH)) {
  fs.mkdirSync(WATCHER_PATH, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, WATCHER_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/api/images', (req, res) => {
  fs.readdir(WATCHER_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read directory' });
    }

    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    res.json({ images: imageFiles });
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ success: true, filename: req.file.filename });
});

app.get('/api/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(WATCHER_PATH, filename);

  // Security: prevent directory traversal
  if (!filepath.startsWith(WATCHER_PATH)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.sendFile(filepath);
});

app.delete('/api/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(WATCHER_PATH, filename);

  // Security: prevent directory traversal
  if (!filepath.startsWith(WATCHER_PATH)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Watcher folder: ${WATCHER_PATH}`);
});
