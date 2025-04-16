const fs = require("fs");
const path = require("path");

function loadCleanedData() {
    const filePath = path.join(__dirname, "../data/cleaned_books.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
}

module.exports = { loadCleanedData };
