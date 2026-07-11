require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/woods", require("./routes/woods"));

// Health Check
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend Running Successfully"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});