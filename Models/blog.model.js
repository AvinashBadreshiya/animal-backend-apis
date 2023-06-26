const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        image: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newBlog = new mongoose.model("blog", blogSchema, "blog");
module.exports = newBlog;
