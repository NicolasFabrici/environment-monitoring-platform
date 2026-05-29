const express = require("express");
const router = express.Router();

const db = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                ROUND(AVG(temperature), 1) as temperature,
                ROUND(AVG(humidity), 1) as humidity,
                ROUND(AVG(air_quality), 1) as air_quality,
                COUNT(DISTINCT sensor_id) as active_sensors
            FROM sensor_data
        `);

        res.json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;