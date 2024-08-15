const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/best-practices', (req, res) => {
    res.json({ content: 'Best practices content goes here.' });
});

app.get('/api/crop-management', (req, res) => {
    res.json({ content: 'Crop management content goes here.' });
});

app.get('/api/market-trends', (req, res) => {
    res.json({ content: 'Market trends content goes here.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

