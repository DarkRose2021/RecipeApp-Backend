const express = require("express");
const dal = require("./dal").dal;
const cors = require("cors");
const port = 5050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("dotenv").config();

require("./routes/favorites")(app);
require("./routes/user")(app);
require("./routes/shoppingList")(app);
require("./routes/recipes")(app);
require("./routes/mealPlan")(app);

app.get("/", async (req, res) => {
	res.json("Generic backend things");
});

app.get("/api/users", (req, res) => {
	res.json("testing get the users");
});

app.post("/api/users", (req, res) => {
	res.json("testing post the users");
});

const users = [
	{
		email: "test@example.com",
		name: "text",
		password: "password123",
	},
];

// Login endpoint
app.post("/login", (req, res) => {
	const { email, password } = req.body;
	const user = users.find((u) => u.email === email);

	if (!user) {
		return res.status(401).json({ message: "Invalid email or password." });
	}
	if (user.password !== password) {
		return res.status(401).json({ message: "Invalid email or password." });
	}
	return res.status(200).json({ message: "Login successful!", user: user });
});

// Signup endpoint
app.post("/signup", (req, res) => {
	const { email, name, password } = req.body;

	// Check for existing user
	const existingUser = users.find((u) => u.email === email);
	if (existingUser) {
		return res.status(409).json({ message: "User already exists." });
	}

	// Create a new user
	const newUser = {
		email,
		name,
		password,
	};

  console.log(newUser)

	// Add the new user to the users array (in a real app, save to a database)
	users.push(newUser);

	// Send a response with the new user
	return res.status(201).json({ message: "Signup successful!", user: newUser });
});

app.listen(port, () => {
	console.log(`Connected to port ${port}`);
});
