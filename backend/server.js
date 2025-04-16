const express = require("express");
const { userBasedRecommendations } = require("./recommender");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Shopping Recommender API is running!");
});

app.get("/recommend/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const result = userBasedRecommendations(userId);
    res.json({ userId, recommendations: result });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
