const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db.js");
const userRoute = require("./routes/user.routes.js");
const authRoute = require("./routes/auth.routes.js");
const employeeRoute = require("./routes/employee.routes.js");
const paymentRoute = require("./routes/razorpay.routes.js");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
connectDB();

app.use(cors({
  origin: [process.env.ORIGINS.split(',') || "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/employee",employeeRoute);
app.use("/api/payment",paymentRoute);

app.get("/", (req, res) => {
  res.send("Server is Listening");
});
app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
module.exports = app;