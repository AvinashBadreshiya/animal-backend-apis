const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		animalType: { type: String, required: true },
		categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		breedType: { type: String, required: true },
		age: { type: Number, required: true },
		weight: { type: String, required: true },
		price: { type: String, required: true },
		desc: { type: String, required: true },
		color: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		phone: { type: Number, required: true },
		milk: { type: String },
		isCalf: { type: Boolean, default: false },
		status: { type: String, default: "Pending" },
		lactation: { type: String },
		calfAge: { type: String },
		calfGender: { type: String },
		frontPhoto: { type: String, required: true },
		backPhoto: { type: String, required: true },
		lumpiCertificate: { type: String, required: true },
		generalReport: { type: String, required: true },
		isPurchase: { type: Boolean, default: false }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newProduct = new mongoose.model("product", productSchema, "product");
module.exports = newProduct;
