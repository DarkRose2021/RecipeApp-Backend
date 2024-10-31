const { mongoose, Schema } = require("mongoose");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
require("dotenv").config();
const bcryptjs = require("bcryptjs");

const config = {
	connectionString: process.env.CONNECTION_STRING,
	userCollection: "Users",
	recipesCollection: "Recipes",
	shoppingListCollection: "ShoppingLists",
	mealPlanCollection: "MealPlans",
	favRecipesCollection: "FavoriteRecipes",
	sessionsCollection: "Sessions",
};

mongoose.connect(config.connectionString);

const connection = mongoose.connection;

connection.on("error", (err) => {
	console.error("Connection error:", err);
});

connection.once("open", () => {
	console.log("mongoose connected");
});

const mealPlanSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		planName: String,
		dateRange: { type: [Date], required: true },
		recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{ collection: config.mealPlanCollection }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

const favoritesSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
	},
	{ collection: config.favRecipesCollection }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);

const recipeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		ingredients: { type: [String], required: true },
		instructions: { type: [String], required: true },
		cookingTime: Number,
		difficultyLevel: Number,
		category: [String],
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ collection: config.recipesCollection }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

const sessionSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		sessionID: String,
		loginTime: { type: Date, default: Date.now },
		logoutTime: Date,
	},
	{ collection: config.sessionsCollection }
);

const Session = mongoose.model("Session", sessionSchema);

const shoppingListSchema = new mongoose.Schema(
	{
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
	},
	{ collection: config.shoppingListCollection }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

const userSchema = new Schema(
	{
		username: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		email: { type: String, unique: true, required: true },
	},
	{ collection: config.userCollection }
);
const User = mongoose.model("User", userSchema);

exports.userDAL = {
	getAllUsers: async () => {
		try {
			let users = await User.find({}).exec();
			return users;
		} catch (error) {
			throw error;
		}
	},

	createUser: async (username, password, email) => {
		try {
			const newUser = await User.create({
				username,
				password,
				email,
			});
			return newUser;
		} catch (error) {
			throw error;
		}
	},

	getUserById: async (userId) => {
		try {
			const user = await User.find({
				_id: new mongodb.ObjectId(userId),
			}).exec();
			return user;
		} catch (error) {
			throw error;
		}
	},

	updateUserById: async (userId, newData) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(userId, newData, {
				new: true,
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	},

	deleteUserById: async (userId) => {
		try {
			const deletedUser = await User.findByIdAndDelete(userId);
			return deletedUser;
		} catch (error) {
			throw error;
		}
	},
};
