const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	equipes: [
		{
			name: {
				type: String,
				required: true,
			},

			roles: [
				{
					name: {
						type: String,
						required: true,
					},
					need: {
						type: Number,
						required: true,
						min: 0,
					},
				},
			],
		},
	],
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "organizations",
		required: true,
	},
});

module.exports = mongoose.model("Team", teamSchema);
