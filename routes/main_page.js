import express from "express";
import { home, library, songs, playMusic, profile } from "../controller/main_routes.js";

const router = express.Router();

router.post("/", home);

router.get("/library/:ID", library);

router.get("/songs/:FirstName", songs);

router.get("/play/:songName", playMusic);

router.get("/profile/:firstName", profile);

export default router;
