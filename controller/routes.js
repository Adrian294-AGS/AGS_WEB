import mysql from "mysql";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
});

export const home = (req, res) => {
  res.render("register");
};

function insert_db(string, value) {
  db.query(string, value, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export const register = (req, res) => {
  const { Email, FirstName, LastName, PhoneNumber, Address } = req.body;

  let Image = req.files.Image;
  let uploadFile = path.join(__dirname, "..", "upload", Image.name);

  Image.mv(uploadFile, (error) => {
    if (error) {
      console.log(error);
    }
  });

  db.query(
    "SELECT Email FROM tbl_users WHERE Email = ?",
    [Email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        res.render("register", { msg: "Email is Already Registered" });
      } else {
        await insert_db(
          "INSERT INTO tbl_users (Email, FirstName, LastName, Address, Image, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)",
          [Email, FirstName, LastName, Address, Image.name, PhoneNumber]
        );
        res.redirect("/login");
      }
    }
  );
};

export const login = (req, res) => {
  res.render("login");
};

export const songInsert = (req, res) => {
  const { songName } = req.body;
  let song_file = req.files.songFile;
  let song_image = req.files.songImage;

  let songFile = path.join(__dirname, "..", "upload", song_file.name);
  let imageFile = path.join(__dirname, "..", "upload", song_image.name);

  song_file.mv(songFile, (error) => {
    if (error) {
      console.log(error);
    }
  });

  song_image.mv(imageFile, (error) => {
    if(error) {
      console.log(error);
    }
  })

  db.query(
    "INSERT INTO tbl_songs (song_name, song_file, song_image) VALUES (?, ?, ?)",
    [songName, song_file.name, song_image.name], (error) => {
      if(error) {
        console.log(error);
      } else {
        console.log("success insert....");
        res.redirect("/test");
      }
    }
  );
};

export const test = (req, res) => {
  res.render("song_insert");
}