const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static(__dirname));

app.get("/api/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(`https://tikwm.com/api/?url=${url}`);
    const data = await response.json();

    if (data && data.data) {
      res.json({
        video: data.data.play,
        title: data.data.title
      });
    } else {
      res.json({ error: "Gagal ambil video" });
    }
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});