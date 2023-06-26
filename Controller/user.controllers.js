const userSchema = require("../Models/user.model");
const userRoleSchema = require("../Models/userRole.model");
const messages = require("../utils/messages.json");
const enums = require("../utils/enums.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const EventEmitter = require('events')
const { mailService } = require("../utils/mail-service")
const otpGenerator = require('otp-generator')
const event = new EventEmitter()

require("dotenv").config();

module.exports = {
	createUser: async (req, res) => {
		const { email, name, phone, password } = req.body;
		try {
			let userExists = await userSchema.findOne({ email: email });
			if (userExists) {
				if (userExists.isActive) {
					return res
						.status(enums.HTTP_CODE.BAD_REQUEST)
						.json({ success: false, message: messages.EMAIL_EXISTS });
				} else {
					return res
						.status(enums.HTTP_CODE.BAD_REQUEST)
						.json({ success: false, message: messages.NOT_AUTHORIZED });
				}
			}
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			const findRole = await userRoleSchema.findOne({ role: "user" }).lean();
			if (!findRole) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.ROLE_NOT_FOUND });
			}
			const create = {
				name,
				email,
				phone,
				password: hash,
				role: findRole._id,
			};
			const userData = await userSchema.create(create);
			if (userData) {
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.SIGNUP_SUCCESS });
			} else {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.ROLE_NOT_FOUND });
			}
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	userLogin: async (req, res) => {
		const { email, password } = req.body;
		try {
			const userData = await userSchema.findOne({ email: email, isActive: true }).populate("role");
			if (!userData) {
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
			const userPassword = userData.password;
			const isMatch = await bcrypt.compare(password, userPassword);
			if (!isMatch) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.NOT_MATCH });
			}

			const data = {
				id: userData._id,
				email: userData.email,
				role: userData.role.role
			};
			const token = jwt.sign(data, process.env.JWT_SECRET);
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.LOGIN_SUCCESS, token, user: userData });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	updateUser: async (req, res) => {
		const user = req.user;
		try {
			const findUser = await userSchema.findById(user._id);
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
			const updateUser = await userSchema.findByIdAndUpdate(
				user._id,
				req.body,
				{ new: true }
			)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.UPDATE_SUCCESSFULLY, user: updateUser });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	getAllUser: async (req, res) => {

		try {
			const getUser = await userSchema.find()
			if (getUser) {
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, user: getUser });
			} else {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	deleteUser: async (req, res) => {

		const { id } = req.query;

		try {
			const userData = await userSchema.findByIdAndUpdate(
				id,
				{ isActive: false }
			)
			if (userData) {
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.DELETE_SUCCESS });
			} else {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
		} catch (error) {
			console.log(error)
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	forgotPassword: async (req, res) => {
		const { email } = req.body
		try {

			const findUser = await userSchema.findOne({ email });
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
			const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
			await userSchema.findByIdAndUpdate(
				findUser._id,
				{ $set: { otp: otp } },
				{ new: true }
			)
			const maildata = {
				to: email,
				subject: "Animalll | Forgot your password",
				otp: otp,
				name: findUser.name
			}

			await mailService(maildata)
			event.emit('OTP expire', findUser)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.EMAIL_SEND });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	verifyOTP: async (req, res) => {
		const { otp, email } = req.body

		try {
			const findUser = await userSchema.findOne({ email })
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}

			if (otp !== findUser.otp) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.OTP_NOT_MATCH });
			}

			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.OTP_MATCH });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	verifyPassword: async (req, res) => {
		const { password, email } = req.body

		try {
			const findUser = await userSchema.findOne({ email: email })
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			await userSchema.findByIdAndUpdate(
				findUser._id,
				{ $set: { password: hash } },
				{ new: true }
			)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.PASSWORD_CHANGE });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	addRole: async (req, res) => {

		const { role } = req.body

		try {

			await userRoleSchema.create({ role })
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.ROLE_ADDED });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	changePassword: async (req, res) => {
		const { email, oldPassword, password } = req.body

		try {
			const findUser = await userSchema.findOne({ email })
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}

			const nPassword = findUser.password
			const isMatch = await bcrypt.compare(oldPassword, nPassword);
			if (!isMatch) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.OLD_PASSWORD_WRONG });
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			await userSchema.findByIdAndUpdate(
				findUser._id,
				{ $set: { password: hash } }
			)
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.PASSWORD_CHANGE });

		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	createVendor: async (req, res) => {
		const { bankName, accountNumber, ifscCode } = req.body

		try {
			const findUser = await userSchema.findById(req.user._id)
			if (!findUser) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.USER_NOT_FOUND });
			}
			const findRole = await userRoleSchema.findOne({ role: "vendor" })
			if (!findRole) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.ROLE_NOT_FOUND });
			}
			const obj4update = {
				bankName,
				accountNumber,
				ifscCode,
				role: findRole._id
			}
			const createVendor = await userSchema.findByIdAndUpdate(
				req.user._id,
				obj4update,
				{ new: true }
			)
			if (createVendor) {
				return res
					.status(enums.HTTP_CODE.OK)
					.json({ success: true, message: messages.VENDOR_CREATED, user: createVendor });
			} else {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.GENERAL });
			}
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	},
	uploadImage: async (req, res) => {
		const file = req.files.file?.data;
		let data = "data:" + req.files.file.mimetype + ";base64," + Buffer.from(file).toString('base64');
		res.status(200).json({ data });
	}
};

event.on('OTP expire', (user) => {
	setTimeout(async () => {
		await userSchema.findByIdAndUpdate(
			user._id,
			{ $set: { otp: null } },
			{ new: true }
		)
	}, 60000)
})
