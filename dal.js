const { mongoose, Schema } = require("mongoose");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const Recipe = require("./schemas/recipes");
const User = require("./schemas/users");

const config = {
	connectionString: process.env.CONNECTION_STRING,
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

exports.recipeDAL = {
	getAllRecipes: async () => {
		try {
			return await Recipe.find({}).exec();
		} catch (error) {
			throw error;
		}
	},

	createRecipe: async (
		title,
		ingredients,
		instructions,
		cookingTime,
		servings,
		difficultyLevel,
		category,
		imageUrl,
		isPublic,
		author
	) => {
		try {
			return await Recipe.create({
				title,
				ingredients,
				instructions,
				cookingTime,
				servings,
				difficultyLevel,
				category,
				imageUrl,
				isPublic,
				author,
			});
		} catch (error) {
			throw error;
		}
	},

	getRecipeById: async (recipeId) => {
		try {
			return await Recipe.find({
				_id: new ObjectID(recipeId),
			}).exec();
		} catch (error) {
			throw error;
		}
	},

	updateRecipeById: async (id, newData) => {
		try {
			return await Recipe.findByIdAndUpdate(id, newData, {
				new: true,
			});
		} catch (error) {
			throw error;
		}
	},

	deleteRecipeById: async (id) => {
		try {
			return await Recipe.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	},
};

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

exports.userDAL = {
	getAllUsers: async () => {
		try {
			return await User.find({}).exec();
		} catch (error) {
			throw error;
		}
	},

	createUser: async (username, password, email) => {
		try {
			return await User.create({
				username,
				password,
				email,
			});
		} catch (error) {
			throw error;
		}
	},

	getUserById: async (userId) => {
		try {
			return await User.find({
				_id: new ObjectID(userId),
			}).exec();
		} catch (error) {
			throw error;
		}
	},

	updateUserById: async (userId, newData) => {
		try {
			return await User.findByIdAndUpdate(userId, newData, {
				new: true,
			});
		} catch (error) {
			throw error;
		}
	},

	deleteUserById: async (userId) => {
		try {
			return await User.findByIdAndDelete(userId);
		} catch (error) {
			throw error;
		}
	},
};
