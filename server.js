require("dotenv").config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dns = require('dns')
dns.setServers(['8.8.8.8','1.1.1.1'])

app.use(cors());
// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;



// Check if URI is loaded
console.log("Mongo URI:", MONGO_URI);
const woodRoutes = require('./routes/woods')
app.use("/api/woods", woodRoutes)

const userRoute = require('./routes/user.route')
app.use("/api/users", userRoute)

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log(" Connected to MongoDB");

        // Start server only after DB connection
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" MongoDB connection error:", err);
        process.exit(1);
    });
    app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});