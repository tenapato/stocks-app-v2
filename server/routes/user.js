import express from "express";
const router = express.Router();

import { user, signin, signup } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", user);

export default router;