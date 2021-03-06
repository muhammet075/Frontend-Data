const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public.css"));

app.use(expressLayouts);
app.set("layout", "./layouts/formaat");
app.set("view engine", "ejs");

app.use(express.json());
var bodyParser = require("body-parser");

app.get("", handleApi, (req, res) => {
  res.render("index");
});

async function handleApi(req, res) {
  const fortniteApi = await fetch("https://www.cryptingup.com/api/markets")
    .then((res) => res.json())
    .then((json) => {
      let nieuwData = [];

      for (var i = 0; i < 20; i++) {
        nieuwData.push(json.markets[i]);
      }

      console.log(nieuwData);

      res.render("", {
        nieuwData: nieuwData,
      });
    });
}

app.listen(port, () => {
  console.log("Server aan");
});
