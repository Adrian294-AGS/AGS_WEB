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
  const { email, first_name } = req.body;

  db.query(
    "SELECT * FROM tbl_users WHERE Email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length === 0) {
        res.render("login", { msg: "Email is not Registered" });
      } else if (results[0].FirstName != first_name) {
        res.render("login", { msg: "Wrong First Name" });
      } else {
        res.render("home", { data: results });
      }
    }
  );
};

export const library = (req, res) => {
  const ID = req.params.ID;
  db.query(
    "SELECT * FROM tbl_users WHERE ID = ?",
    [ID],
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("home", { data: results });
      }
    }
  );
};

export const songs = (req, res) => {
  const name = req.params.FirstName;

  db.query("SELECT * FROM tbl_songs", (error, song_results) => {
    if (error) {
      console.log(error);
    } else {
      db.query(
        "SELECT * FROM tbl_users WHERE FirstName = ?",
        [name],
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("songs", { songs: song_results, data: results });
          }
        }
      );
    }
  });
};

export const playMusic = (req, res) => {
  const songName = req.params.songName;

  db.query(
    "SELECT * FROM tbl_songs WHERE song_name = ?",
    [songName],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("play", { music: results });
      }
    }
  );
};

export const profile = (req, res) => {
  const first_name = req.params.FirstName;

  db.query(
    "SELECT * FROM tbl_users WHERE FirstName = ?",
    [first_name],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("profile", { profile: results });
      }
    }
  );
};
