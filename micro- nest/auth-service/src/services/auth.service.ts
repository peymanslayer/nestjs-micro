import { Injectable,Inject,HttpException,HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { IUser } from 'src/interfaces/user.Interface';
import { BasicService } from './basic.service';

@Injectable()
export class AuthService {
  constructor(@Inject('users') private readonly userMicroservice: ClientProxy,
   private basicService:BasicService
  ){}

  async login (user:IUser){     
     const loginUser: any= await this.userMicroservice.send('loginuser',user).toPromise();              
    if(!loginUser){
      return{
        status:404,
        message:'user not exist'
      }
    }      
     const token=await this.basicService.createToken(user);
     const refreshToken= await this.basicService.refreshToken(user)  
      const comparePassword=await this.basicService.comparePassword(user.Password,loginUser.message.Password); 
          
      if(comparePassword){
       return {
        status:200,
        message:'login sucssesfull', 
        token,
        refreshToken   
       }
       }
      return {
       status:400,
       message:'password not match'
     }
  }



  async register(users:IUser){
     const userFind= await this.userMicroservice.send('loginuser',users).toPromise();
     console.log(users);
     
     console.log(userFind);
     
     if(userFind.message!==null){
      return{
        status:404,
        message:'user exist'
      }
     }
     const hashPassword=await this.basicService.hashPassword(users);
     const token=await this.basicService.createToken(users);
     const createUser=await this.userMicroservice.send('createuser',{users,hashPassword}).toPromise(); 
      console.log(token);
      
     return { status:createUser.status, message:token}
  }



  async logOut(){
   
  }

  
  async token(user){
   const refreshToken=user.refreshToken
   if(!refreshToken){
   return{
    status:403,
    message:"unauth"
   }
  }
  const verifyToken= await this.basicService.verifyToken(refreshToken)
  return verifyToken
}

}
