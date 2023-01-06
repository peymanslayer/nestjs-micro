import { Injectable,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {

    constructor(@Inject('product') private readonly productMicroservice: ClientProxy,
    @Inject('users') private readonly userMicroservice: ClientProxy){}
    async addUser(user:IUser){

        return await this.userMicroservice.send('useradd',user);
    }

    async updateUser(user:IUser){
     
    }


    async file (user){
   const upload=this.productMicroservice.send('file',user);

     return upload
    }

}
