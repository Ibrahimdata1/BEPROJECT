const express = require("express");
const router = express.Router();
const Category = require("../model/category");
const verifyToken = require('../verifyToken')

router.post("/add_category",verifyToken,async (req, res) => {
    try {
        const {categoryName} = req.body
    const newCategory = new Category({
        categoryName
    });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
