import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import figlet from "figlet";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "Wating for inputs,,," });
});

app.post("/get-cocktail", async (req, res) => {
  const ingredient = req.body.ingredient;
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const drink = response.data.drinks.slice(0, 10).map(drink => drink.strDrink);
    console.log(drink);
    res.render("index.ejs", { content: drink });
  } catch (error) {
    res.render("index.ejs", { content: null });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
