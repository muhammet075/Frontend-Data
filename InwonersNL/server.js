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
  const landenApi = await fetch(
    "https://countriesnow.space/api/v0.1/countries/population"
  )
    .then((res) => res.json())
    .then((json) => {
      var nieuwData = json.data[185].populationCounts;

      //244 tr

      console.log(nieuwData);

      let inwoners = [];

      for (let i = 0; i < nieuwData.length; i++) {
        inwoners.push(nieuwData[i].value);
      }

      console.log(inwoners);

      res.render("", {
        nieuwData: nieuwData,
        inwoners: inwoners,
      });
    });
}

app.listen(port, () => {
  console.log("Server aan");
});
