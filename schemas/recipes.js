const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [{
    quantity: { type: String, required: true },
    name: { type: String, required: true },
  }],
  instructions: [{
    step: { type: String, required: true },
  }],
  cookingTime: {
    type: Number,
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
    required: true,
  }],
  imageUrl: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }, {collection: "Recipes"});

module.exports = mongoose.model('Recipe', RecipeSchema);