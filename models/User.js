const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchama = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		firstUser: { type: Boolean, default: false },
		secondUser: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("user", userSchama);
