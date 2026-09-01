import * as userModel from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export async function addUser(req, res){
    const {username, password} = req.body;
    try{
        const password_hash = await argon2.hash(password, {
            type: argon2.argon2id,
        });
        await userModel.addUser(username, password_hash);
        return res.status(201).json({
            message: "user added"
        });
    }
    catch(err){
        return res.status(501).json({
            message: "Failed to register an user",
            error: err.message
        });
    }

}

export async function verifyUser(req, res){
    const {username, password} = req.body;
    console.log("backend - username: ", username);
    console.log("backend - pass: ", password);

    try{
        const db_result = await userModel.getUser(username);
        console.log("db result conetent: " + db_result);
        if(db_result.length === 0){
            return res.status(401).json({
                message:"Username or password incorrect"
            });
        }

        const match = await argon2.verify(
            db_result[0].password_hash,
            password
        );
        if(match){
            const token = jwt.sign(
                {
                    id: db_result[0].id,
                    username: username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            );

            return res.status(200).json({
                message:"username and password are verified",
                success: true,
                token
            });
        }
        else{
            return res.status(401).json({
                message:"username or password not correct",
                success: false
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: "Failed to verify user",
            error: err.message
        })
    }
    
    
}
