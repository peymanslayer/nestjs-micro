import { Controller, Get,Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { AuthService } from './services/auth.service';
import {Payload,Ctx,RmqContext} from '@nestjs/microservices'
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() payload: any,@Ctx() context: RmqContext){    
     const loginUser= this.authService.login(payload)
     return loginUser
  }
  @MessagePattern('register')
  async register(@Payload() Payload:any,@Ctx() context:RmqContext){

    return await this.authService.register(Payload); 
    
  }

  @MessagePattern('token')
  async token (@Payload() Payload:any){
    const token=await this.authService.token(Payload);
    return token;
  }



}
