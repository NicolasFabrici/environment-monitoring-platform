const express = require("express");

const router = express.Router();

const db = require("../config/db");

const bcrypt = require("bcryptjs");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {

            const [users] = await db.query(`
                SELECT
                    id,
                    username,
                    role
                FROM users
                ORDER BY id ASC
            `);

            res.json(users);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }

    }
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {

            const {
                username,
                password,
                role
            } = req.body;

            const hashedPassword =
                await bcrypt.hash(password, 10);

            await db.query(`
                INSERT INTO users
                (username, password, role)
                VALUES (?, ?, ?)
            `, [
                username,
                hashedPassword,
                role
            ]);

            res.json({
                message: "User created"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }

    }
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {

            const { id } = req.params;

            const { role } = req.body;

            await db.query(`
                UPDATE users
                SET role = ?
                WHERE id = ?
            `, [role, id]);

            res.json({
                message: "User updated"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }

    }
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    async (req, res) => {

        try {

            const { id } = req.params;

            await db.query(`
                DELETE FROM users
                WHERE id = ?
            `, [id]);

            res.json({
                message: "User deleted"
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }

    }
);

module.exports = router;