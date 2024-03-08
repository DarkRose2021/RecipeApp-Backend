const mealPlanSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	planName: String,
	dateRange: { type: [Date], required: true },
	recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
	// Add other fields as needed
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);