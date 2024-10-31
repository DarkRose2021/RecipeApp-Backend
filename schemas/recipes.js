const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: [{
    name: { type: String, required: true },
    quantity: { type: String },
  }],
  instructions: [{
    step: { type: String, required: true },
  }],
  cookingTime: {
    type: Number, // Time in minutes
  },
  servings: {
    type: Number,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
  }],
  imageUrl: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
