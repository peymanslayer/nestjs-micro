import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({required:true})
  category: string;

  @Prop({required:true})
  name: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  feature:[object]

  @Prop({required:true})
  price:number

  @Prop({required:false})
  offPrice:number

  @Prop({required:false})
  image:string
}

export const ProductSchema = SchemaFactory.createForClass(Product);
