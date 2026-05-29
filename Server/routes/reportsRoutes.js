const express = require("express");

const router = express.Router();

const db = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {

    try {

        const [stats] = await db.query(`
            SELECT
                ROUND(AVG(temperature), 1) AS avg_temperature,
                ROUND(AVG(humidity), 1) AS avg_humidity,
                MAX(temperature) AS max_temperature,
                MAX(air_quality) AS worst_air_quality
            FROM sensor_data
        `);

        const [history] = await db.query(`
            SELECT
                temperature,
                humidity,
                air_quality,
                recorded_at
            FROM sensor_data
            ORDER BY recorded_at DESC
            LIMIT 20
        `);

        res.json({
            stats: stats[0],
            history
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;