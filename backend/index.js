const compression = require("compression");
const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./db/db")
//const cors = require("cors");
dotenv.config({path: './config/config.env'})
const app = express();
//for gzip compression
app.use(compression({ threshold: 0 }));
//routes
const authRoutes = require('./routes/authRoute')
const budgetRoutes = require("./routes/budgetRoute")
const tokenVerificationMiddleware = require("./middleware/tokenVerificationMiddleware");

const PORT = process.env.PORT || 5001;
// const MONGO_URL = "mongodb://root:rootpassword@127.0.0.1:27017";



connectDB(process.env.MONGO_URI)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.json());

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/budget", tokenVerificationMiddleware, budgetRoutes);
