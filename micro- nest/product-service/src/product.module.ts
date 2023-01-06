import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [MongooseModule.forFeature([{name:'products', schema:ProductSchema}]),
  MongooseModule.forRoot('mongodb://localhost/product')
],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
