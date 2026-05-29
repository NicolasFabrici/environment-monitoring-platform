const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const createAuditLog = require("../utils/createAuditLog");

router.get("/", authMiddleware, async (req, res) => {

    try {
        const [rows] = await db.query(`
            SELECT * FROM sensors
            ORDER BY id ASC
        `);
        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {
            const {
                name,
                location,
                status
            } = req.body;
            const [result] = await db.query(`
            INSERT INTO sensors
            (name, location, status)
            VALUES (?, ?, ?)
        `, [name, location, status]);

            await createAuditLog(
                req.user.username,
                "CREATE_SENSOR",
                `Created sensor "${name}"`
            );
            res.json({
                message: "Sensor created",
                sensorId: result.insertId
            });

        } catch (error) {

            console.error(error);
            res.status(500).json({
                error: error.message
            });
        }
    });

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {
            const { id } = req.params;
            await db.query(`
            DELETE FROM sensors
            WHERE id = ?
        `, [id]);
            await createAuditLog(
                req.user.username,
                "DELETE_SENSOR",
                `Deleted sensor ID ${id}`
            );
            res.json({
                message: "Sensor deleted"
            });

        } catch (error) {

            console.error(error);
            res.status(500).json({
                error: error.message
            });
        }
    });

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {
            const { id } = req.params;
            const {
                name,
                location,
                status
            } = req.body;
            await db.query(`
            UPDATE sensors
            SET
                name = ?,
                location = ?,
                status = ?
            WHERE id = ?
        `, [name, location, status, id]);

            await createAuditLog(
                req.user.username,
                "UPDATE_SENSOR",
                `Updated sensor "${name}"`
            );
            res.json({
                message: "Sensor updated"
            });

        } catch (error) {

            console.error(error);
            res.status(500).json({
                error: error.message
            });
        }
    });

module.exports = router;