import { IsNotEmpty,IsInt } from "class-validator";
import { JoiSchema } from "nestjs-joi";
import * as Joi from 'joi'

export class UserDto{
    
    Email:string
  
    
    Password:string
  
    @IsInt({message:'number'})
    PhoneNumber:number

    @IsNotEmpty({message:'Username not be empty'})
    Username:string
}