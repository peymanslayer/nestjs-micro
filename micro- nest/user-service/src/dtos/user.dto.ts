import { IsNotEmpty } from "class-validator";
export class UserDto{
  @IsNotEmpty()
  Email:string

  @IsNotEmpty()
  Password:string

  @IsNotEmpty()
  PhoneNumber:number

  @IsNotEmpty()
  Username:string
}