const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const subCategoryController = require("../Controller/subcategory.controllers")
const {
    validatation4addsubcategory,
    validatation4updatesubcategory
} = require("../utils/joi.validate")

router.post("/add-subcategory", authAdmin, validatation4addsubcategory, subCategoryController.addsubCategory)
router.get("/get-subcategory", subCategoryController.getsubCategory)
router.put("/update-subcategory", authAdmin, validatation4updatesubcategory, subCategoryController.updatesubCategory)
router.delete("/delete-subcategory", authAdmin, subCategoryController.deletesubCategory)

module.exports = router