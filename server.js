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
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5178",
  "https://mywoods-website-hkm9.onrender.com",
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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