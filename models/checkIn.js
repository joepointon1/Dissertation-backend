import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckInSchema = new Schema(
	{
		user: {
			type: String,
			require: true,
		},
		emotions: [
			{
				type: Array,
			},
		],
		intensity: {
			type: Array,
		},
		activities: {
			type: Array,
		},
		note: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const CheckIn = mongoose.model("CheckIn", CheckInSchema);

export default CheckIn;
