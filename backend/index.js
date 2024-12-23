const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db.js");
const userRoute = require("./routes/user.routes");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user",userRoute);

app.get("/", (req, res) => {
  res.send("Server is Listening");
});
app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
module.exports = app;