const { userDAL } = require("../dal");

module.exports = (app) => {
	app.get("/users", async (req, res) => {
		const users = await userDAL.getAllUsers();
		res.json(users);
	});

	app.get("/user/:id", async (req, res) => {
        const id = req.params.id
		const user = await userDAL.getUserById(id)
		res.json(user);
	});

    app.post("/users", async (req, res) => {
		const users = await userDAL.createUser(req.body.username, req.body.password, req.body.email);
		res.json(users);
	});

	app.put("/user/:id", async (req, res) => {
		const updatedUser = await userDAL.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updatedUser);
	});

	app.patch("/user/:id", async (req, res) => {
		const updatedUser = await userDAL.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updatedUser);
	});

	app.delete("/user/:id", async (req, res) => {
		await userDAL.findByIdAndDelete(req.params.id);
		res.json({ message: "User deleted" });
	});
};
