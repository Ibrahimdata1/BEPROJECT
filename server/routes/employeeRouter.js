const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Employee = require('../model/employee')
const multer = require('multer')
const verifyToken = require('../verifyToken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage: storage
})


router.post('/employee_login',verifyToken,async(req,res)=>{
    try {
        const employee = await Employee.findOne({ email: req.body.email });
        if (!employee) {
          return res.status(404).json({error:"employee not exist!"});
        }
        const match = await bcrypt.compareSync(req.body.password, employee.password);
        if (!match) {
          return res.status(401).json({error:"wrong password!"});
        }
        const token = jwt.sign({ id: employee._id }, process.env.SECRETKEY, {
          expiresIn: "1h",
        });
        const { password, ...resInfo } = employee._doc;
        res.cookie("token", token).status(200).json(resInfo);
      } catch (error) {
        res.status(500).json(error);
      }
})

router.post('/add_employee',upload.single('image'),verifyToken,async(req,res)=>{
    try {
        const {employeName, email, password,salary,address,category_id} = req.body;
        const image = req.file.filename
        console.log(req.file)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newEmployee = new Employee({ employeName,email, password: hashedPassword,salary,address,category_id,image});
    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/",verifyToken,async (req, res) => {
    try {
      const allEmployee = await Employee.find();
      res.status(200).json(allEmployee);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get('/employeeCount',async(req,res)=>{
    try {
        const count = await Employee.countDocuments()
        if(!count){
            return res.status(404).json({error:"something went wrong!"})
        }
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/salaryCount',async(req,res)=>{
    try {
        const count = await Employee.aggregate([ { 
            $group: { 
                _id: null, 
                total: { 
                    $sum: "$salary" 
                } 
            } 
        } ] )
        if(!count){
            return res.status(404).json({error:"something went wrong!"})
        }
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id',verifyToken,async(req,res)=>{
        try {
            const getPost = await Employee.findById(req.params.id)
            res.status(200).json(getPost)
        } catch (error) {
            res.status(500).json(error)
        }
    })


router.delete('/delete_employee/:id',verifyToken,async(req,res)=>{
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.status(200).send('Delete Succesful!')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/edit_employee/:id',verifyToken,async(req,res)=>{
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
          }
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      const {password,...restInfo}= updatedEmployee._doc
      res.status(200).json(restInfo)
  } catch (error){
      res.status(500).json(error)
  }
})

module.exports = router