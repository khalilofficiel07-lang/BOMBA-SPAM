const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/activate", (req, res) => {
    res.json({ message: "✅ تم التفعيل (Demo)" });
});

app.post("/stop", (req, res) => {
    res.json({ message: "🛑 تم الإيقاف (Demo)" });
});

app.listen(3000, () => {
    console.log("🔥 Server running on http://localhost:3000");
});
