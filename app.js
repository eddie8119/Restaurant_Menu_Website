const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const restaurants = require("./restaurantLists.json");

//設定模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurants.results });
});

//搜尋功能
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  // const selectRestaurant = restaurants.results.filter(
  //   (restaurant) =>
  //     restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
  //     restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  // );
  const selectRestaurant = restaurants.results.filter((restaurant) =>
    keywordCheck(restaurant)
  );

  function keywordCheck(items) {
    return (
      items.name.toLowerCase().includes(keyword.toLowerCase()) ||
      items.category.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // if (selectRestaurant.length == 0) {
  //   // res.send("關鍵字沒有符合條件的菜單");
  //   return alert("關鍵字沒有符合條件的菜單");
  // }
  res.render("index", { restaurants: selectRestaurant, keyword: keyword });
});

//個別明細
app.get("/restaurant/:restaurant_id", (req, res) => {
  const restaurantOne = restaurants.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurantOne });
});

//監聽伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
