const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", authMiddleware, async (req, res) => {

    try {
        const { id } = req.params;
        const [sensor] = await db.query(`
            SELECT *
            FROM sensors
            WHERE id = ?
        `, [id]);
        const [history] = await db.query(`
            SELECT *
            FROM sensor_data
            WHERE sensor_id = ?
            ORDER BY recorded_at DESC
            LIMIT 20
        `, [id]);

        res.json({
            sensor: sensor[0],
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