import { Document, Model, ObjectId } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    mobile: string;
    age: number;
    password: string;
    active: boolean
}

export interface IUserDocument extends Document{

}

export interface IUserModel extends Model<IUserDocument> {
    login(user: IUser): Promise<IUserDocument>
    register(user: Record<string, string | number | boolean>): Promise<IUserDocument | unknown>
    getusers(id?: string): Promise<IUserDocument>
    updateUser(user: IUser): Promise<IUserDocument>
    deleteUser(id: ObjectId): Promise<boolean>
}

