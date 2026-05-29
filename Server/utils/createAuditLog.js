const db = require("../config/db");

async function createAuditLog(
    username,
    actionType,
    details
) {

    try {

        await db.query(`
            INSERT INTO audit_logs
            (
                username,
                action_type,
                details
            )
            VALUES (?, ?, ?)
        `, [
            username,
            actionType,
            details
        ]);

    } catch (error) {

        console.error(
            "Audit log error:",
            error
        );

    }

}

module.exports = createAuditLog;