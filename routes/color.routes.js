const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const colorController = require("../Controller/color.controllers")
const {
    validatation4addcolor
} = require("../utils/joi.validate")

router.post("/add-color", authAdmin, validatation4addcolor, colorController.addcolor)
router.get("/get-color", colorController.getcolor)
router.delete("/delete-color", authAdmin, colorController.deleteColor)

module.exports = router