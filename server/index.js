const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.router");
const jwt = require("jsonwebtoken");
const enquiryRouter = require("./routes/enquiry");
require("dotenv").config();
const app = express();

app.use(express.json(), cors());
app.use("/", userRouter);
app.use("/", enquiryRouter)

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.listen(4500, async () => {
  try {
    await connection;
    console.log("server is running at port 4500 and db is connected");
  } catch (error) {
    console.log(error);
  }
});



// {
//   "username": "Bhawesh",
//   "email":"Bhawesh@gmail.com",
//   "destination": "Goa",
//   "interest": "beach",
//   "travelers": "3",
//   "budget": 2333,
//   "duration": 2,
//   "date": "2024/05/12",
//   "notes": "None",
//   "userId": "cjnik112"
// }