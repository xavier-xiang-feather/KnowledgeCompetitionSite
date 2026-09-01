import express from "express";
import {getQuestions, addQuestion, editQuestion, deleteQuestion} from "../controllers/questionController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", getQuestions);
router.post("/", authenticateToken, addQuestion);
router.put("/:id", authenticateToken, editQuestion);
router.delete("/:id", authenticateToken, deleteQuestion);

export default router;