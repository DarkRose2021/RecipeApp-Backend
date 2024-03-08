const { mongoose, Schema } = require("mongoose");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
require("dotenv").config();
const bcryptjs = require("bcryptjs");

const config = {
	connectionString: process.env.CONNECTION_STRING,
	userCollection: "Users",
};

mongoose.connect(config.connectionString);






const shoppingListSchema = new mongoose.Schema({
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
	// Add other fields as needed
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

const favoritesSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
	// Add other fields as needed
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

const sessionSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	sessionID: String,
	loginTime: { type: Date, default: Date.now },
	logoutTime: Date,
	// Add other fields as needed
});

const Session = mongoose.model("Session", sessionSchema);

exports.userDAL = {
	// Create a new user
	createUser: async (username, password, email, profilePicture) => {
		try {
			const newUser = await UserModel.create({
				username,
				password: await bcryptjs.hash(password, 10),
				email,
				profilePicture,
			});
			return newUser;
		} catch (error) {
			throw error;
		}
	},

	// Read user by ID
	getUserById: async (userId) => {
		try {
			const user = await UserModel.findById(userId);
			return user;
		} catch (error) {
			throw error;
		}
	},

	// Update user by ID
	updateUserById: async (userId, newData) => {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, {
				new: true,
			});
			return updatedUser;
		} catch (error) {
			throw error;
		}
	},

	// Delete user by ID
	deleteUserById: async (userId) => {
		try {
			const deletedUser = await UserModel.findByIdAndDelete(userId);
			return deletedUser;
		} catch (error) {
			throw error;
		}
	},
};
