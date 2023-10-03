import { NextFunction, Request, Response } from "express";
import UserController from "../controller/user-controller";
import AuthController from "../controller/auth-controller";
import { verifyToken } from "../auth";

export default function globalRoutconfig(app:any) {
    interceptor(app);
    AuthController(app);
    protectRoute(app);
    UserController(app);
    errorHandler(app);
}

function protectRoute(app:any) {
    app.use((req:any, res:Response, next:NextFunction) => {
        const bearer = req.headers['authorization'];
        const token = bearer && bearer?.split(' ')[1];
        if(!token)return res.sendStatus(401);
        verifyToken(token,(err:any, decode:any) => {
            if(err)return res.sendStatus(403);
            req['user'] = decode;
            const { method } = req;
            const { id } = req.params;
            if(
                method === 'PUT' || 
                method === 'DELETE' && 
                id !== decode._id
            )return res.sendStatus(400);
            next();
        });
    });
}

function interceptor(app:any) {
    app.use((req:Request, res:Response, next:NextFunction) => {
        next();
    });
}

function errorHandler(app:any){
    app.use((err:any, req:Request, res:Response, next:NextFunction) => {
        if(err){
            res.json(err.message);
        }
    });
}