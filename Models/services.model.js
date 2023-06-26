const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
	{
		email: { type: String },
		type: {type: String },
		image: {type: String },
		data: { type: Object }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newService = new mongoose.model("service", serviceSchema, "service");
module.exports = newService;
