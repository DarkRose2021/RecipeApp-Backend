const MealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  days: [{
    day: { type: String, required: true },
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    }],
  }],
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', MealPlanSchema);