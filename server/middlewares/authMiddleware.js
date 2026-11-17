//用于在使用http请求前验证token

import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            message: "请登录"
        })
    }
    const token = authHeader.split(" ")[1];
    try{
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = user;
        next();
    }
    catch{
        return res.status(401).json({
            message: "token failed to be verified"
        })
    }
}