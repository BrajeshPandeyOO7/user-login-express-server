import mongoose, { ObjectId, Schema, model } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "../interfaces/Iuser";
import { generateJwtToken, hashPassword, validatePassword } from "../auth";

const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    mobile: {
        type: Schema.Types.String,
        required: true
    },
    age: {
        type: Schema.Types.Number,
        required: false
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    active: {
        type: Schema.Types.Boolean,
        required: false
    }
});

UserSchema.statics.login = async function (user: IUser) {
    const { email, password } = user;
    const res_user = await this.findOne({email}).lean().exec();
    const isPassowrdValid = await validatePassword(password,res_user);
    if(!isPassowrdValid)
        return "something wrong!";
    const auth_token =  await generateJwtToken(res_user);
    const { password:pass , ...res} = res_user
    return {
       ...res,
        auth_token
    }
}

UserSchema.statics.register = async function (body: IUser) {
    const { email, password } = body;
    const hash_password = await hashPassword(password);
    const res = await this.findOne({email}).lean().exec();
    if(res || !hash_password){
        return {
            error: 'something wrong'
        }
    }
    const _user = new UserModel({...body, password: hash_password});
    const is_user_valid = _user.validateSync();
    if(!is_user_valid){
        return await _user.save();           
    }else{
        return {
            error: is_user_valid.message
        }
    }
}
UserSchema.statics.getusers = async function (_id?: string) {
    if(_id){
        const user = await this.findOne({_id: new mongoose.Types.ObjectId(_id)}, {password: 0}).lean().exec();
        return user;

    }else {
        const users = await this.find({},{password:0});
        return users;
    }
}
UserSchema.statics.updateUser = async function (_id: string, user: IUserDocument) {
    const { _id:id, password, ...rest} = user;
    return await this.findOneAndUpdate({_id}, {$set: rest},{new: true, projection:{password: 0}}).exec(); 
}

UserSchema.statics.deleteUser = async function (id?: any) {
    const {acknowledged, deletedCount} =  await this.deleteOne({_id:id}).exec();
    if(!deletedCount) throw Error('Not Found');
    return {
        acknowledged,
        deletedCount
    }
}

const UserModel: IUserModel = model<IUserDocument, IUserModel>('users',UserSchema);
export default UserModel;