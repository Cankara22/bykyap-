// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const stockFilePath = path.join(__dirname, 'stocks.json');

// Stok verilerini okuma
const readStockData = () => {
    if (fs.existsSync(stockFilePath)) {
        return JSON.parse(fs.readFileSync(stockFilePath, 'utf-8'));
    }
    return [];
};

// Stok verilerini yazma
const writeStockData = (data) => {
    fs.writeFileSync(stockFilePath, JSON.stringify(data, null, 2));
};

app.get('/api/stocks', (req, res) => {
    res.json(readStockData());
});

app.put('/api/stocks', (req, res) => {
    writeStockData(req.body);
    res.status(200).send('Stock data updated');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
