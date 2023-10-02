import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/Iuser';
import { JWT_PRIVATE_KEY } from '../config';

export const hashPassword = async (password: string): Promise<string | null> => {
    const salt_round = 10;
    return await bcrypt.hash(password,salt_round).then(res => res).catch(err => null);
}

export const validatePassword = async (current_password:string, user:IUser):
    Promise<boolean> => 
        await bcrypt.compare(current_password, user?.password); 

export const generateJwtToken = async (user:IUser): Promise<string> => {
    if(!JWT_PRIVATE_KEY)
        throw new Error('JWT private must be valid!');
    return jwt.sign({
            data: user
        }, JWT_PRIVATE_KEY, 
        { 
            expiresIn: '1h',
        });
}

export const verifyToken = async (token:string,cb: (err:any, decode:any) => void) => {
    if(!JWT_PRIVATE_KEY)
        throw new Error('JWT private must be valid!');
    return jwt.verify(token,JWT_PRIVATE_KEY, cb);
}