import { Module } from '@nestjs/common';
import {UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/user'),
  MongooseModule.forFeature([{name:'user', schema:UserSchema}])],

  controllers: [UserController],
  
  providers: [UserService],
})
export class UserModule {}
