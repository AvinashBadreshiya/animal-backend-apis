const express = require("express")
const router = express.Router()
const { authUser, authAdmin } = require("../middlewere/auth")
const contactController = require("../Controller/contactus.controllers")
const {
    validatation4createContact
} = require("../utils/joi.validate")

router.post("/addContact", authUser, contactController.addContact)
router.get("/getContact", contactController.getContact)
router.delete("/deleteContact", authAdmin, contactController.deleteContact)

module.exports = router