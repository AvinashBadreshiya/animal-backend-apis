const express = require("express")
const router = express.Router()
const { authVendor, authUser } = require("../middlewere/auth")
const productController = require("../Controller/product.controllers")
const {
    validatation4addproduct,
    validatation4updateproduct
} = require("../utils/joi.validate")

router.post("/add-product", authVendor, validatation4addproduct, productController.addProduct)
router.get("/get-product", authUser, productController.getProduct)
router.get("/getProductById", authVendor, productController.getProductById)
router.get("/getUserProduct", productController.getUserProduct)
router.put("/update-product", authVendor, validatation4updateproduct, productController.updateProduct)
router.delete("/delete-product", authVendor, productController.deleteProduct)
router.post("/buy-product", authUser, productController.buyProduct)
router.post("/order-success", authUser, productController.orderSuccess)
router.get("/getProductCounter", authVendor, productController.getProductCounter)
router.get("/get-order", authUser, productController.getOrder)
router.get("/getVendorOrder", authVendor, productController.getVendorOrder)
  
module.exports = router