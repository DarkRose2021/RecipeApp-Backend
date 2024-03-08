const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	ingredients: [String],
	instructions: { type: String, required: true },
	cookingTime: Number,
	difficultyLevel: String,
	category: String,
	rating: Number,
	comments: [String],
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	// Add other fields as needed
});

const Recipe = mongoose.model("Recipe", recipeSchema);