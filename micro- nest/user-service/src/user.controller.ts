import { Controller, Get,Body,Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { MessagePattern, Payload, Ctx, RmqContext,EventPattern } from '@nestjs/microservices';
import { UserDto } from './dtos/user.dto';
import { UserSchema } from './schema/user.schema';
@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern('loginuser')
 async findOneUser(@Payload() payload: any,@Ctx() context: RmqContext) {  
 const findUser= await this.appService.findOneUser(payload)
    return findUser ;
  }

  findAllUser(@Body() user:UserDto) :Promise<object>{
    return this.appService.findAllUsers()
  }

  @MessagePattern('createuser')
   async createUser(@Payload() payload: any,@Ctx() context: RmqContext){

   return this.appService.createUsers(payload)
    
  }
}
