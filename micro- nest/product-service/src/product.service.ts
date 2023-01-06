import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ProductDocument} from "./schema/product.schema";
import { Product } from './schema/product.schema';
@Injectable()
export class ProductService {
  constructor(@InjectModel('products') private productModel:Model<ProductDocument>){}

 async findProduct(product:any): Promise<Product> {
    const findOneProduct=await this.productModel.findOne({
      image:product.file.originalname,
    price:product.product.price,
    category:product.product.category,
    description:product.product.description,
    feature:product.product.feature,
    offPrice:product.product.offPrice,
    name:product.product.name
    })
    return findOneProduct;
  }


  async findProducts(){
    const findProducts= await this.productModel.find();
    return findProducts
  }


  async createProduct(product:any){    
   const findProduct=await this.findProduct(product)
   if(findProduct!==null){
    return 'product exist'
   }
   const createProduct=await this.productModel.create({
    image:product.file.originalname,
    price:product.product.price,
    category:product.product.category,
    description:product.product.description,
    feature:product.product.feature,
    offPrice:product.product.offPrice,
    name:product.product.name
   })
   return createProduct
  }

  async updateProduct(product:any){
    const perviusProduct:any=await this.findProductById(product.id);
    console.log(perviusProduct);
    
    const updateProduct= await this.productModel.findByIdAndUpdate(product.id,{
      image:product.file.originalname,
      price:product.product.price,
      category:product.product.category,
      description:product.product.description,
      feature:product.product.feature,
      offPrice:product.product.offPrice,
      name:product.product.name
   },{new:true})
  return {
    status:200,
    message:updateProduct,perviusProduct
  }
  }

  async findProductById(id:string){
     const findProductById=await this.productModel.findById(id);
     return findProductById
  }
}
