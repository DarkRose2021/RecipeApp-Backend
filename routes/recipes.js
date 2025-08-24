const { recipeDAL } = require("../dal");

const dal = require("../dal").dal;
module.exports = (app) => {
	app.get("/recipes", async (req, res) => {
		res.json(await recipeDAL.getAllRecipes());
	});

	app.get("/recipe/:id", async (req, res) => {
		let id = req.params.id;
		res.json("one recipe");
	});

	app.post("/recipes", async (req, res) => {
		const recipe = await recipeDAL.createRecipe(
			req.body.title,
			req.body.ingredients,
			req.body.instructions,
			req.body.cookingTime,
			req.body.servings,
			req.body.difficultyLevel,
			req.body.category,
			req.body.imageUrl,
			req.body.isPublic,
			req.body.author
		);
		res.json(recipe);
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
