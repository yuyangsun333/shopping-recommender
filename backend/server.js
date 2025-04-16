const express = require('express');
const cors = require('cors');
const recommender = require('./recommender');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/recommend/user', (req, res) => {
    const userId = req.query.user_id;
    const recommendations = recommender.userBased(userId);
    res.json(recommendations);
});

app.get('/recommend/item', (req, res) => {
    const productId = req.query.product_id;
    const recommendations = recommender.itemBased(productId);
    res.json(recommendations);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
