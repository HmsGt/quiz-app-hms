const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for the quiz data
const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: Number
});

// Create a model for the quiz data
const Quiz = mongoose.model('Quiz', quizSchema);

// Route to add a new quiz question
app.post('/add-question', (req, res) => {
    const newQuestion = new Quiz(req.body);

    newQuestion.save((err) => {
        if (err) {
            res.status(500).send('Error saving question');
        } else {
            res.status(200).send('Question saved successfully');
        }
    });
});

// Route to get all quiz questions
app.get('/questions', (req, res) => {
    Quiz.find({}, (err, questions) => {
        if (err) {
            res.status(500).send('Error fetching questions');
        } else {
            res.status(200).json(questions);
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
