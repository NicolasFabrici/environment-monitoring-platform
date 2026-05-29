require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const sensorRoutes = require("./routes/sensorRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const alertsRoutes = require("./routes/alertsRoutes");
const sensorSimulator = require("./services/sensorSimulator");
const authRoutes = require("./routes/authRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const sensorDetailsRoutes = require("./routes/sensorDetailsRoutes");
const userRoutes = require("./routes/userRoutes");

sensorSimulator(io);

app.use("/api/sensors", sensorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/sensor-details", sensorDetailsRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "Environmental Monitoring API Running"
    });

});

io.on("connection", (socket) => {

    console.log("Client connected");

    socket.on("disconnect", () => {

        console.log("Client disconnected");

    });

});

const PORT = 3001;

server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});