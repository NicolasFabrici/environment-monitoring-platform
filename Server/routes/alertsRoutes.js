const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {

    try {

        const [alerts] = await db.query(`
            SELECT *
            FROM alerts
            ORDER BY created_at DESC
        `);

        res.json(alerts);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            message,
            severity
        } = req.body;

        const [result] = await db.query(`
            INSERT INTO alerts
            (title, message, severity)
            VALUES (?, ?, ?)
        `, [title, message, severity]);

        res.json({
            message: "Alert created",
            alertId: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

router.put("/:id/resolve", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(`
            UPDATE alerts
            SET status = 'Resolved'
            WHERE id = ?
        `, [id]);

        res.json({
            message: "Alert resolved"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(`
            DELETE FROM alerts
            WHERE id = ?
        `, [id]);

        res.json({
            message: "Alert deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;