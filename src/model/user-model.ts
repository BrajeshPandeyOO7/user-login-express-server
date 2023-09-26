import mongoose, { ObjectId, Schema, model } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "../interfaces/Iuser";

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

}
UserSchema.statics.register = async function (body: IUser) {
    const { email } = body;
    const res = await this.findOne({email}).lean().exec();
    if(res){
        return {
            error: 'something wrong'
        }
    }
    const _user = new UserModel(body);
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
        const user = await this.findOne({_id: new mongoose.Types.ObjectId(_id)}).lean().exec();
        return user;

    }else {
        const users = await this.find();
        return users;
    }
}
UserSchema.statics.updateUser = async function (user: IUserDocument) {
    const { _id , ...rest} = user;
    return await this.findOneAndUpdate({_id: _id}, {$set: rest},{new: true}).exec(); 
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