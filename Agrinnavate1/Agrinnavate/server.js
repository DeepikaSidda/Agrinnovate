const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/farmingDashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mongoose Schemas
const questionSchema = new mongoose.Schema({
    name: String,
    email: String,
    question: String,
});

const Question = mongoose.model('Question', questionSchema);

// File Upload Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/questions', (req, res) => {
    const newQuestion = new Question(req.body);
    newQuestion.save()
        .then(() => res.status(201).send('Question submitted'))
        .catch((err) => res.status(400).send(err));
});

app.post('/api/upload', upload.single('photo'), (req, res) => {
    res.status(201).send(`File uploaded: ${req.file.filename}`);
});

app.listen(5000, () => console.log('Server running on port 5000'));
