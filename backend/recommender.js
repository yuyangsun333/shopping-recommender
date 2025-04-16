const { loadCleanedData } = require("./utils");

const data = loadCleanedData();

// Build user -> item rating map
const userRatings = {};
data.forEach(({ user_id, product_id, rating }) => {
    if (!userRatings[user_id]) userRatings[user_id] = {};
    userRatings[user_id][product_id] = rating;
});

function userBasedRecommendations(targetUserId, topN = 10) {
    const target = userRatings[targetUserId];
    if (!target) return [];

    const similarity = {};

    // Count overlap
    for (const [otherUser, ratings] of Object.entries(userRatings)) {
        if (otherUser === targetUserId) continue;

        let common = 0;
        for (const item in target) {
            if (ratings[item]) common++;
        }
        if (common > 0) similarity[otherUser] = common;
    }

    const similarUsers = Object.entries(similarity)
        .sort((a, b) => b[1] - a[1])
        .map(([u]) => u);

    const recommended = {};
    for (const u of similarUsers.slice(0, 5)) {
        for (const [item, rating] of Object.entries(userRatings[u])) {
            if (!target[item]) {
                recommended[item] = (recommended[item] || 0) + rating;
            }
        }
    }

    return Object.entries(recommended)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([item]) => item);
}

module.exports = { userBasedRecommendations };
