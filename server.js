const express = require("express");
const dal = require("./dal").dal;
const cors = require("cors");
const { status } = require("express/lib/response");
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
  res.json({
    Status : "Running",
    ServiceName: "NeuFoods Server",
    Routes: [
      "None yet"
    ],
    
  })
});



app.listen(port, () => {
  console.log('Listening on port ' + port);
});