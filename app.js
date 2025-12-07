const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.get('/upload', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'upload.html')); 
});


app.post('/upload', upload.single('foto'), (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.send(`
        <img src="${imageUrl}" width="400">
        <br><br>
        <a href="/upload">Upload again</a>
    `);
});

app.listen(3000);
console.log("3000 is the port");

