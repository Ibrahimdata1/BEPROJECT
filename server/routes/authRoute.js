const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require('../model/db')
const jwt = require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    try {
        const {username, email, password } = req.body;
        console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username,email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/adminlogin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({error:"user not exist!"});
      }
      const match = await bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(401).json({error:"wrong password!"});
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      const { password, ...resInfo } = user._doc;
      res.cookie("token", token,).status(200).json(resInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get("/logout", async (req, res) => {
    try {
      res
        .clearCookie("token")
        .status(200)
        .json({message:"user logged out successfully!"});
    } catch (error) {
      res.status(500).json(error);
    }
  });
router.get('/adminCount',async(req,res)=>{
    try {
        const count = await User.countDocuments()
        if(!count){
            return res.status(404).json({error:"something went wrong!"})
        }
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/adminRecords',async(req,res)=>{
    try {
        const user = await User.find();
        if (!user) {
          return res.status(404).json({error:"user not exist!"});
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/test',async(req,res)=>{
    try {
        const token = jwt.sign({ id: 12121}, process.env.SECRETKEY);
          res.cookie("token", token,).status(200)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router