require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRouter")
const employeeRoute = require('./routes/employeeRouter');
const verifyTokenEmp = require('./verifyTokenEmp');
const verifyToken = require('./verifyToken')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connect successfull!");
  } catch (error) {
    console.log(error);
  }
};
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'))
app.use("/auth", authRoute);
app.use("/category",categoryRoute)
app.use("/employee",employeeRoute)

app.get('/verifyEmp',verifyTokenEmp,async(req,res)=>{
      return res.status(200).json({role:'employee',id:req.id})

})

app.get('/verifyAdmin',verifyToken,async(req,res)=>{
      return res.status(200).json({role:'admin'})

})
app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("Server in running in PORT:5000");
});

module.exports = app