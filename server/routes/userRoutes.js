import express from "express";
import {addUser, verifyUser} from "../controllers/userController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/login", verifyUser);
router.post("/register", addUser);

router.get("/me", authenticateToken, (req, res) => {
    res.status(200).json({
        user: req.user
    });
});

export default router;