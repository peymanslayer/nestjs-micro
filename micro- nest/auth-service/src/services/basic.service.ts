import { Injectable,Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices/client';
import { IUser } from 'src/interfaces/user.Interface';
import {sign} from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';
@Injectable()
export class BasicService {
 constructor(@Inject('users') private readonly userMicroservice: ClientProxy
 ){}
 async comparePassword(user:any,password): Promise<boolean> {
    const comparePassword=await bcrypt.compare(user,password)
    return comparePassword ;
  }


  async hashPassword(user:IUser){
    
    const salt = await bcrypt.genSalt(10)
   const hashedPassword= await bcrypt.hash(user.Password,salt);
   
   return hashedPassword
  }


  async createToken(user:IUser){
    const token= sign({Password:user.Password},'my secrt',{
        expiresIn:'20s'
    });
    return token
  }


  async refreshToken(user){
    const refreshToken= await sign({Email:user.Email},'my secret',{
      expiresIn:'30d'
    })
    return refreshToken
  }


  async verifyToken(token){
    const verifyToken=await jwt.verify(token,'my secret',async (err,user)=>{
      if(err){
        console.log(err);
        
        return{
          status:404,
          message:'token close'
        }
      }
   const acssesToken=await this.createToken(user)
   return acssesToken
    });
    return verifyToken
  }
}