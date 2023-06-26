const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const categoryController = require("../Controller/category.controllers")
const {
    validatation4addcategory,
    validatation4updatecategory
} = require("../utils/joi.validate")

router.post("/add-category", authAdmin, validatation4addcategory, categoryController.addCategory)
router.get("/get-category", categoryController.getCategory)
router.put("/update-category", authAdmin, validatation4updatecategory, categoryController.updateCategory)
router.delete("/delete-category", authAdmin, categoryController.deleteCategory)

module.exports = router