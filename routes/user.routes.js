const express = require("express")
const router = express.Router()
const userController = require("../Controller/user.controllers")
const { authAdmin, authUser } = require("../middlewere/auth")
const {
    validatation4signup,
    validatation4login,
    validatation4updateuser,
    validatation4forgotpass,
    validatation4verifyOTP,
    validatation4verifypassword,
    validatation4changepassword,
    validatation4createvendor 
} = require("../utils/joi.validate")

router.post("/create-user", validatation4signup, userController.createUser)
router.post("/login", validatation4login, userController.userLogin)
router.put("/update-user", authUser, validatation4updateuser, userController.updateUser)
router.get("/get-all-user", authAdmin, userController.getAllUser)
router.delete("/delete-user", authAdmin, userController.deleteUser)
router.post("/forgot-password", validatation4forgotpass, userController.forgotPassword)
router.post("/verify-otp", validatation4verifyOTP, userController.verifyOTP)
router.post("/verify-password", validatation4verifypassword, userController.verifyPassword)
router.post("/change-password", validatation4changepassword, userController.changePassword)
router.post("/add-role", authAdmin, userController.addRole)
router.post("/create-vendor", authUser, validatation4createvendor, userController.createVendor)
router.post("/upload-image", userController.uploadImage)
module.exports = router