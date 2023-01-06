import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';// I couldn't see the error class is being exported from Mongoose

@Catch(Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest();

    let error;

    switch (exception.name) {
      case 'DocumentNotFoundError': {
       response.status(HttpStatus.BAD_REQUEST).json('document not')
       break;
      }

      case 'ValidatorError': {
        response.status(HttpStatus.BAD_REQUEST).json('validatior error')
         break;    
    }

      case 'ValidationError': {
        console.log('lk');
        
        response.status(HttpStatus.FORBIDDEN).json('validation error')        
         break;
     }
     
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Error"
        }
        break;
      }
    }

    response.status(error.statusCode).json(error);
  }
}