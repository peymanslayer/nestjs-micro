import { Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { UserDocument,User } from './schema/user.schema';

@Injectable()
export class UserService {
 constructor(@InjectModel('user') private userModel:Model<UserDocument>){}

 async findOneUser(user:IUser): Promise<any> {
  
   
    const findUser= await this.userModel.findOne({Email:user.Email});
    console.log(findUser);
        
    return {
      status:200,
      message:findUser
    }
  }

  async findAllUsers():Promise<object>{
    const findAllUser= await this.userModel.find();
    return {
      status:200,
      message:findAllUser
    }
  }

  async createUsers(user:any):Promise<object>{
    const {users,hashPassword}=user
    const createUser= await this.userModel.create({
      Email:users.Email,
      Password:hashPassword,
      Username:users.Username,
      PhoneNumber:users.PhoneNumber,
    });
    createUser.save();
    return {
      status:201,
      message:createUser
    }
  }

  async updateUser(user:IUser,params:string){
    const updateedUser= await this.userModel.findByIdAndUpdate(params,user,{
      new:true
    })
    return {
      status:200,
      message:updateedUser
    }
  }

  async removeUser(params:string){
     await this.userModel.findByIdAndDelete(params);
    return {
      status:200,
      message:"user removed"
    }
  }
async craete(user){
  const add=await this.userModel.create(user)
  return add
}
  
}
