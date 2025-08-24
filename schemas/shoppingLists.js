const ShoppingListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listName: String,
    dateCreated: { type: Date, default: Date.now },
    items: [
      {
        name: String,
        quantity: Number,
        unit: String,
        isPurchased: { type: Boolean, default: false },
      },
    ],
  }, { timestamps: true });

module.exports = mongoose.model('ShoppingLists', ShoppingListSchema);