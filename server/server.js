import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import pageRoutes from "../routes/page.js";
import fileUpload from "express-fileupload";
import mainPage from "../routes/main_page.js";

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL CONNECTED..........");
  }
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());

app.use(express.static("public"));
app.use(express.static("upload"));
app.set("view engine", "hbs");

app.use("/", pageRoutes);
app.use("/home", mainPage);

app.listen(5000, () => {
  console.log("server started at http://localhost:5000");
});
