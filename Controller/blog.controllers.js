const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const blogSchema = require("../Models/blog.model")

module.exports = {

    addBlog: async (req, res) => {

        try {
            const blog = await blogSchema.create(req.body);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.BLOG_ADDED, blog });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }

    },
    getBlog: async (req, res) => {
        try {
            const blog = await blogSchema.find().sort({ "createdAt": -1 });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, blog });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateBlog: async (req, res) => {
        try {
            const blog = await blogSchema.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.BLOG_UPDATED, blog });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const blog = await blogSchema.findByIdAndDelete(req.query.id);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.BLOG_DELETED, blog });

        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }

}