const userSchema = require("../Models/user.model")
const roleSchema = require("../Models/userRole.model")
const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {

    createSuperAdmin: async () => {

        const superAdmin = await userSchema.findOne({ email: process.env.SUPER_ADMIN_EMAIL })
        if (!superAdmin) {
            const role = await roleSchema.findOne({ role: "superAdmin" }).lean()
            if (!role) {
                return false
            }
            const createSuperAdmin = {
                name: "Super Admin",
                email: process.env.SUPER_ADMIN_EMAIL,
                password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
                phone: process.env.SUPER_ADMIN_MOBILE,
                role: role._id,
                status: true
            }

            await userSchema.create(createSuperAdmin)
            console.log("Super Admin created")
        } else {
            console.log("Super Admin is Available")
        }
    },
    superAdminLogin: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await userSchema.findOne({ email }).populate("role")
            if (!user) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.USER_NOT_FOUND });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: messages.NOT_MATCH });
            }

            const data = {
                id: user._id,
                role: user.role.role,
                email: user.email
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, message: messages.LOGIN_SUCCESS, token, user: user });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const getUser = await userSchema.find({ isActive: true }).populate("role").lean()
            let newUser = []
            if (getUser.length > 0) {
                newUser = getUser.filter((x) => x.role.role !== "superAdmin")
            }
            return res
                .status(enums.HTTP_CODE.OK)
                .json({ success: true, user: newUser, count: newUser.length });
        } catch (error) {
            return res
                .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },


}