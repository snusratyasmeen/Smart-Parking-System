const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/api/status", async (req, res) => {
    try {
        const token = process.env.BLYNK_TOKEN;

        const response1 = await fetch(
            `https://blynk.cloud/external/api/get?token=${token}&v0`
        );

        const response2 = await fetch(
            `https://blynk.cloud/external/api/get?token=${token}&v1`
        );

        const slot1 = await response1.text();
        const slot2 = await response2.text();

        res.json({
            slot1: Number(slot1),
            slot2: Number(slot2)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to get Blynk data"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Smart Parking Server running at http://localhost:${PORT}`);
});