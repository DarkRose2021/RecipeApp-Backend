const dal = require("../dal").dal;
module.exports = (app) => {
	app.get("/recipes", async (req, res) => {
		res.json("all recipes");
	});

	app.get("/recipe/:id", async (req, res) => {
		let id = req.params.id;
		res.json("one recipe");
	});

	app.put("/recipe/:id", async (req, res) => {
		let id = req.params.id;
		res.json("replace the entire recipe");
	});

	app.patch("/recipe/:id", async (req, res) => {
		let id = req.params.id;
		res.json("replace part of recipe");
	});

	app.delete("/recipe/:id", async (req, res) => {
		let id = req.params.id;
		res.json("delete recipe");
	});
};
