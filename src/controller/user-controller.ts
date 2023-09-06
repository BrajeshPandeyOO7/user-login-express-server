import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../model/user-model';
import { ObjectId } from "mongoose";

const getusers = (route:any) => {
    route.get('/:id?', async (req:Request, res:Response) => {
        const { id } = req.params;
        const body = req.body;
        const user = await UserModel.getusers(id);
        return res.send(user)
    });
}

const updateUser = (route:any) => {
    route.put('/', async (req:Request, res:Response) => {
        const body = req.body;
        res.send({body, message: 'update complete'})
    });
}

const deleteUser = (route:any) => {
    route.delete('/', async (req:Request, res:Response) => {
        res.send({message: 'delete complete'})
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