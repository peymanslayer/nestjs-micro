
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
 
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors:any = await validate(object);
    if (errors.length > 0) {
        console.log(errors[0]);
        const obj=Object.values(errors[0].constraints)
        throw new BadRequestException({message:obj})
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

