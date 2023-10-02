import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../model/user-model';
import { sendError, sendResponse } from '../helper';


const login = (route:any) => {
    route.post('/login', async (req:Request, res:Response) => {
        const body = req.body;
        try {
            const body = req.body;
            const _response = await UserModel.login(body);
            return res.send(
                sendResponse(_response)
            )
        } catch (error) {
            res.send(
                sendError((error as Error).message)
            );
        }
    });
}

const register = (route:any) => {
    route.post('/register', async (req:Request, res:Response) => {
        try {
            const body = req.body;
            const user = await UserModel.register(body);
            return res.send(
                sendResponse(user)
            )
            
        } catch (error) {
            res.send(
                sendError((error as Error).message)
            );
        }
    });
}

export default function AuthController(app:any) {
    const user_route = express.Router();
    app.use('/auth',user_route)
    user_route.use((req:Request, res:Response, next:NextFunction) => {
        next()
    });
    login(user_route);
    register(user_route);
}