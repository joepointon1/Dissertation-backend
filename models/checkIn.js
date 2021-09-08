import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckInSchema = new Schema(
	{
		user: {
			type: String,
			require: true,
		},
		emotions: {
			type: Array,
		},
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

CheckInSchema.index({
	note: "text",
});

const CheckIn = mongoose.model("CheckIn", CheckInSchema);

export default CheckIn;
