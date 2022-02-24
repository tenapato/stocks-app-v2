import express from "express";
const router = express.Router();

import { user, signin, signup, deleteUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", user);
router.delete('/:id', deleteUser);

export default router;