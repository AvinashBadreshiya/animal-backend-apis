const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String },
		email: { type: String },
		password: { type: String },
		phone: { type: Number },
		image: { type: String },
		role: { type: mongoose.Schema.Types.ObjectId, ref: "userRole" },
		isActive: { type: Boolean, default: true },
		otp: { type: Number, default: null },
		address: { type: String },
		city: { type: String },
		state: { type: String },
		pincode: { type: Number },
		country: { type: String },
		bankName: { type: String, default: null },
		ifscCode: { type: String, default: null },
		accountNumber: { type: Number, default: null },
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newUser = new mongoose.model("user", userSchema, "user");
module.exports = newUser;
