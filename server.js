const express = require("express");
const dal = require("./dal").dal;

const cors = require("cors");
const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("dotenv").config();



app.listen(port, () => {
	console.log(`Connected to port ${port}`);
});
