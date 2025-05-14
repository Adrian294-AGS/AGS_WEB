import express from "express";
import { home, register, login, songInsert, test } from "../controller/routes.js";

const route = express.Router();

route.get("/", home);

route.post("/register", register);

route.get("/table", (req, res) => {
  res.render("db_table");
});

route.get("/login", login);
route.get("/test", test);
route.post("/songInsert", songInsert);

export default route;
