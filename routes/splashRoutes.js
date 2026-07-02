import express from "express";
import { getSplash } from "../controllers/splashController.js";

const router = express.Router();

router.get("/", getSplash);

export default router;
