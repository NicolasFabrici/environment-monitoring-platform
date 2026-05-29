const db = require("../config/db");
const alertCooldowns = {
    highTemperature: 0,
    criticalAir: 0
};

const ALERT_COOLDOWN = 5 * 60 * 1000;

module.exports = (io) => {

    setInterval(async () => {

        const temperature = Number(
            (20 + Math.random() * 15).toFixed(1)
        );
        const humidity = Number(
            (40 + Math.random() * 30).toFixed(1)
        );
        const air_quality = Math.floor(
            60 + Math.random() * 60
        );
        const active_sensors = Math.floor(
            10 + Math.random() * 5
        );
        const liveData = {
            temperature,
            humidity,
            air_quality,
            active_sensors
        };

        io.emit("environment-update", liveData);

        io.emit("activity-feed", {
            time: new Date().toLocaleTimeString(),
            message: `Environment updated • Temp ${temperature}°C • Humidity ${humidity}% • AQI ${air_quality}`
        });

        try {
            // =========================
            // SAVE SENSOR DATA
            // =========================
            await db.query(`
                INSERT INTO sensor_data
                (
                    sensor_id,
                    temperature,
                    humidity,
                    air_quality
                )
                VALUES (?, ?, ?, ?)
            `, [
                1,
                temperature,
                humidity,
                air_quality
            ]);

            // =========================
            // ALERTS
            // =========================

            const now = Date.now();

            if (
                temperature > 30 &&
                now - alertCooldowns.highTemperature > ALERT_COOLDOWN
            ) {

                alertCooldowns.highTemperature = now;

                await db.query(`
                INSERT INTO alerts
                (title, message, severity)
                VALUES (?, ?, ?)
            `, [
                    "High Temperature",
                    `Temperature reached ${temperature}°C`,
                    "High"
                ]);

                io.emit("new-alert");

                io.emit("activity-feed", {
                    time: new Date().toLocaleTimeString(),
                    message: `High temperature alert triggered (${temperature}°C)`
                });

            }

            if (temperature <= 30) {
                highTemperatureAlert = false;
            }

            if (
                air_quality > 100 &&
                now - alertCooldowns.criticalAir > ALERT_COOLDOWN
            ) {

                alertCooldowns.criticalAir = now;

                await db.query(`
                INSERT INTO alerts
                (title, message, severity)
                VALUES (?, ?, ?)
            `, [
                    "Critical Air Quality",
                    `Air quality reached AQI ${air_quality}`,
                    "Critical"
                ]);

                io.emit("new-alert");

                io.emit("activity-feed", {
                    time: new Date().toLocaleTimeString(),
                    message: `Critical air quality detected (AQI ${air_quality})`
                });

            }

            if (air_quality <= 100) {
                criticalAirAlert = false;
            }

        } catch (error) {
            console.error(error);
        }
    }, 5000);
};