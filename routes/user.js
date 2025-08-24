const { userDAL } = require("../dal");

module.exports = (app) => {
	app.get("/users", async (req, res) => {
		res.json(await userDAL.getAllUsers());
	});

	app.get("/user/:id", async (req, res) => {
		res.json(await userDAL.getUserById(req.params.id));
	});

	app.post("/users", async (req, res) => {
		res.json(
			await userDAL.createUser(
				req.body.username,
				req.body.password,
				req.body.email
			)
		);
	});

	app.put("/user/:id", async (req, res) => {
		res.json(await userDAL.updateUserById(req.params.id, req.body));
	});

	app.patch("/user/:id", async (req, res) => {
		res.json(await userDAL.updateUserById(req.params.id, req.body));
	});

	app.delete("/user/:id", async (req, res) => {
		await userDAL.deleteUserById(req.params.id);
		res.json({ message: "User deleted" });
	});
};
