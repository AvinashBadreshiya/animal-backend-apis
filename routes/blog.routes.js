const express = require("express")
const router = express.Router()
const { authAdmin } = require("../middlewere/auth")
const blogController = require("../Controller/blog.controllers")
const {
    validatation4addBlog,
    validatation4updateBlog
} = require("../utils/joi.validate")

router.post("/add-blog", authAdmin, validatation4addBlog, blogController.addBlog)
router.get("/get-blog", blogController.getBlog)
router.put("/update-blog", authAdmin, validatation4updateBlog, blogController.updateBlog)
router.delete("/delete-blog", authAdmin, blogController.deleteBlog)

module.exports = router