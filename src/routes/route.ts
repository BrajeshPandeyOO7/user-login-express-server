import { NextFunction, Request, Response } from "express";
import UserController from "../controller/user-controller";
import AuthController from "../controller/auth-controller";

export default function globalRoutconfig(app:any) {
    interceptor(app);
    AuthController(app);
    protectRoute(app);
    UserController(app);
    errorHandler(app);
}

function protectRoute(app:any) {
    app.use((req:Request, res:Response, next:NextFunction) => {
        const token: any = req.headers['access-token'];
        if(token){
            next();
        }else{
            res.send({message: 'token missing!'});
            return;
        }
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