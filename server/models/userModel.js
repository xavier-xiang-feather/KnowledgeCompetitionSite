import db from "../database/db.js";

export async function addUser(username, password_hash){
    try{
        const [result] = await db.query(
            `
            INSERT INTO users(username, password_hash)
            VALUES (?,?)
            `,
            [username, password_hash]
        );
        if (result.affectedRows === 0){
            throw new Error("Failed to register an user");
        }
    }
    catch(err){
        throw err;
    }
    
}

export async function getUser(username){
    try{
        const [result] = await db.query(
            `
            SELECT *
            FROM users
            WHERE username = ?
            `,
            [username]
        );
        if(result.length === 0){
            throw new Error("Failed to get username and password from db");
        }
        return result;
    }
    catch(err){
        throw err;
    }
    

}