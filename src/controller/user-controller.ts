import express, { NextFunction, Request, Response } from 'express'
import UserModel from '../model/user-model';
import mongoose, { ObjectId } from "mongoose";
import { IUser, IUserDocument } from '../interfaces/Iuser';

const getusers = (route:any) => {
    route.get('/:id?', async (req:Request, res:Response) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await UserModel.getusers(id);
            res.send(user);
        } catch (error) {
            res.send({
                message: (error as Error).message
            })
        }
    });
}

const updateUser = (route:any) => {
    route.put('/', async (req:Request, res:Response) => {
        try {
            const body = req.body;
            if(!body) throw Error("Body can't evaluate!");
            const user = new UserModel(body);
            if(!user.validateSync()){
                const response = await UserModel.updateUser(user)
                res.send(response);
            };
        } catch (error) {
            res.send({
                message: (error as Error).message
            })
        }   
    });
}

const deleteUser = (route:any) => {
    route.delete('/:id?', async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
            if(!id) throw new Error('Bad request');
            const response = await UserModel.deleteUser(new mongoose.Types.ObjectId(id.toString()))
            res.send(response)
        } catch (error) {
            res.send({
                message: (error as Error).message
            })
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