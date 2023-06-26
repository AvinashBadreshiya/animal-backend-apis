const express = require("express")
const router = express.Router()
const { authAdmin, authUser } = require("../middlewere/auth")
const serviceController = require("../Controller/service.controllers")
const {
    validatation4addservice
} = require("../utils/joi.validate")

router.post("/add-service", authAdmin, validatation4addservice, serviceController.addservice)
router.get("/get-service", serviceController.getservice)
router.delete("/delete-service", authAdmin, serviceController.deleteservice)
router.get("/hireService", authUser, serviceController.hireService)

module.exports = router