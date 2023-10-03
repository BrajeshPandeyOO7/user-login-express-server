import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    mobile: string;
    age: number;
    password: string;
    active: boolean
}

export interface IUserDocument extends IUser, Document{
    _id: ObjectId
}

export interface IUserModel extends Model<IUserDocument> {
    login(user: IUser): Promise<IUserDocument>
    register(user: Record<string, string | number | boolean>): Promise<IUserDocument | unknown>
    getusers(id?: string): Promise<IUserDocument>
    updateUser(id: string, user: IUserDocument): Promise<IUserDocument>
    deleteUser(id: mongoose.Types.ObjectId): Promise<boolean>
}

