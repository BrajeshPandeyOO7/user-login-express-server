import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../model/user-model';
import mongoose from "mongoose";
import { sendError, sendResponse } from '../helper';

const getusers = (route:any) => {
    route.get('/:id?', async (req:Request, res:Response) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await UserModel.getusers(id);
            res.send(
                sendResponse(user)
            );
        } catch (error) {
            res.send(
                sendError((error as Error).message)
            )
        }
    });
}

const updateUser = (route:any) => {
    route.put('/:id', async (req:Request, res:Response) => {
        try {
            const body = req.body;
            const { id } = req.params;
            if(!body) throw Error("Body can't evaluate!");
            if(body){
                const response = await UserModel.updateUser(id,body)
                res.send(
                    sendResponse(response)
                );
            };
        } catch (error) {
            res.send(
                sendError((error as Error).message)
            )
        }   
    });
}

const deleteUser = (route:any) => {
    route.delete('/:id?', async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
            if(!id) throw new Error('Bad request');
            const response = await UserModel.deleteUser(new mongoose.Types.ObjectId(id.toString()))
            res.send(
                sendResponse(response)
            );
        } catch (error) {
            res.send(
                sendError((error as Error).message)
            )
        }
    });
}

export default function UserController(app:any) {
    const user_route = express.Router();
    app.use('/user',user_route)
    user_route.use((req:Request, res:Response, next:NextFunction) => {
        next()
    });
    getusers(user_route);
    updateUser(user_route);
    deleteUser(user_route);
}