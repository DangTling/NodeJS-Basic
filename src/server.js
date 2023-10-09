import express from "express";
import configViewEngine from "./config/ViewEngine";
import InitWebRoute from "./route/Web";
import InitApiRoute from "./route/Api";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
var morgan = require("morgan");

app.use((req, res, next) => {
  //check => return res.send()
  console.log(">>> run into my middleware");
  console.log(req.method);
  next();
});

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
InitWebRoute(app);
InitApiRoute(app);

app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
