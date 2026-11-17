import express from"express";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("backend is running");
});



app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

app.listen(3001, () => {
    console.log("server started on http://localhost:3001");
});

// app.get("/api/questions", (req, res) => {
    //     res.json([
    //         {
    //             id: 1,
    //             question: "泠鸢yousa的身高是？",
    //             options: [
    //                 {id: 1, text: "140 cm"},
    //                 {id: 2, text: "145 cm"},
    //                 {id: 3, text: "148 cm"},
    //                 {id: 4, text: "150 cm"}
    //             ],
    //             correctAnswer: 3
    //         },
    //         {
    //             id: 2,
    //             question: "泠鸢yousa的生日是？",
    //             options: [
    //                 {id: 1, text: "3月19日"},
    //                 {id: 2, text: "5月19日"},
    //                 {id: 3, text: "5月20日"}
    //             ],
    //             correctAnswer: 2
    //         }
    //     ])
    // });