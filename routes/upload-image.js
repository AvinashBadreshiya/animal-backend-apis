const express = require("express")
const router = express.Router()
const imageController = require("../utils/uploadImage")

router.post("/upload-image", imageController.uploadImage)

module.exports = router