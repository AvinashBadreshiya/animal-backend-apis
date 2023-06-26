const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const superAdminController = require("../Controller/superAdmin.controllers")
const productController = require("../Controller/product.controllers")
const {
} = require("../utils/joi.validate")
router.get("/get-all-user", authAdmin, superAdminController.getAllUser)
router.post("/super-admin-login", superAdminController.superAdminLogin)
// Products Controller
router.post("/updateProductStatus", authAdmin, productController.updateProductStatus)

module.exports = router