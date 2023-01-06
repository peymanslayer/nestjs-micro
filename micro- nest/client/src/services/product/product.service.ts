import { Injectable,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class ProductService{
  constructor(@Inject('product') private readonly productMicroservice:ClientProxy){

  }

  
  async addProduct(product,file){
    const addProduct=await this.productMicroservice.send('add',{product,file}).toPromise()
    if(addProduct!=='product exist'){
        return addProduct 
    }
      return "not ok"
  }

  async updateProduct(product,file,id){
    const updateProduct= await this.productMicroservice.send('updateproduct',{product,file,id}).toPromise();
    console.log(updateProduct);
    
    const perviusImagePath=path.join(__dirname,`../../../uploads/${updateProduct.perviusProduct.image}`);
    fs.unlink(perviusImagePath,(err)=>{
        if(err)
        console.log(err);
        
    });
    return updateProduct
    
  }
}