const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
		vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		isPurchase: { type: Boolean, default: true }
	},
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	}
);

const newOrder = new mongoose.model("order", orderSchema, "order");
module.exports = newOrder;
