import { Controller, Get,Body,Post,UploadedFile } from '@nestjs/common';
import { IProduct } from './interfaces/user.interface';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { MessagePattern,Payload } from '@nestjs/microservices';
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findProduct(@Body() product:IProduct ): Promise<Product> {
    return this.productService.findProduct(product);
  }

 
 
@MessagePattern('add')
 async addProduct(@Payload() payload:any) {
  
    const addProduct= await this.productService.createProduct(payload);
   return addProduct
  }

@MessagePattern('updateproduct')
 async updateProduct(@Payload() payload:any){
  return await this.productService.updateProduct(payload)
 }
}
