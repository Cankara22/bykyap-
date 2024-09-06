// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let stockData = []; // Stok verilerini burada saklayacağız

app.get('/api/stocks', (req, res) => {
    res.json(stockData);
});

app.post('/api/stocks', (req, res) => {
    stockData = req.body; // Stok verilerini günceller
    res.status(200).send('Stock data updated');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
