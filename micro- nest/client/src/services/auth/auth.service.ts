import { Injectable,Inject } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(@Inject('auth') private readonly authMicroservice: ClientProxy){}
   async login(user:IUser){
     const loginUser:any=await this.authMicroservice.send('login',user).toPromise();
     return { user:loginUser}
   }
   async register(user:UserDto){
    const loginUser :any= await this.authMicroservice.send('register',user).toPromise();
    console.log(loginUser);
    
    if(loginUser.token){
        return {message: loginUser.message,token:loginUser.token}
    }
    return loginUser
  }
 
  async token(user:IUser){
    const token=await this.authMicroservice.send('token',user).toPromise();
    return token
  }
}
