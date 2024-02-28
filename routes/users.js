import express from "express";

import { getUsers, postUser, loginUser, buscarEmail} from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", postUser)

router.post("/loginUser", loginUser);

router.post("/buscarEmail", buscarEmail)

export default router