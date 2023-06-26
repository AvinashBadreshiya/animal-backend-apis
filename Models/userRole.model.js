const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema(
    {
        role: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
        autoCreate: true,
    }
);

const newRole = new mongoose.model("userRole", userRoleSchema, "userRole");
module.exports = newRole;
