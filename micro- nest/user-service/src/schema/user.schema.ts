
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required:true,type:String})
  Username: string;

  @Prop({required:true,minlength:1})
  PhoneNumber: number;

  @Prop({required:true})
  Password: string;

  @Prop({required:true,type:String})
  Email:string

  @Prop({required:false})
  token:string
}

export const UserSchema = SchemaFactory.createForClass(User);
