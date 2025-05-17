const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let videos = [];

app.get('/', (req, res) => {
  res.render('index', { videos });
});

app.post('/upload', upload.single('video'), (req, res) => {
  if (req.file) {
    videos.push('/uploads/' + req.file.filename);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});