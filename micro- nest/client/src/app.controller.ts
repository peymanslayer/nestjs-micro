import { Controller, Get,Post,Body,Put,Res, Req,UseInterceptors,UploadedFile,Param } from '@nestjs/common';
import { Response,Request, response } from 'express';
import { UserService } from './services/user/user.service';
import { IUser } from './interfaces/user.interface';
import { AuthService } from './services/auth/auth.service';
import { UserDto } from './dtos/user.dto';
import { ValidationPipe } from './validations/user.pipe';
import { multerOptions } from './config/multer.option';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './services/product/product.service';

@Controller('api')
export class AppController {
  constructor(private readonly userService: UserService,
              private readonly authService:AuthService,
              private readonly productService:ProductService
    ) {}

  @Post('user')
  addUser(@Body() user:IUser) {
    return this.userService.addUser(user)
  }
  @Put('/updateuser')
  updateUser(@Body() user:IUser){
    
  }


  @Post('/login')
 async login(@Body() user:IUser ,@Req() request:Request,@Res({ passthrough: true }) response: Response){

    const loginUser :any =await this.authService.login(user);
    if(loginUser.token) {  
    response.cookie('token',loginUser.token)
    }
  console.log(loginUser);
  
    response.status(loginUser.user.status).json({message:loginUser.user.message,token:loginUser.user.token,refresh:loginUser.user.refreshToken});
  }


  @Post('/register')

 async register(@Body(new ValidationPipe()) user:UserDto ,@Req() request:Request,@Res({ passthrough: true }) response: Response){
    const loginUser:any=await this.authService.register(user);
    
      return loginUser
  
  }


  @Post('/logout')
  logOut(@Body() user:IUser, @Req() req:Request,@Res() response:Response){

   response.clearCookie('connect.sid')
   return response.status(200).json('you loged out')

  }

  @Post('token')
  async token(@Body() user:IUser){
   const token=await this.authService.token(user) 
   return token
  }


@Post('ex')
 async ex(@Body() user:IUser){
   return await this.userService.addUser(user)
  }
  @UseInterceptors(FileInterceptor('file',multerOptions))
  @Post('upload')
  async Upload(@Body() product:IUser,@UploadedFile() file: Express.Multer.File){
    const addProduct=await this.productService.addProduct(product,file)
    return addProduct
  }

  @UseInterceptors(FileInterceptor('file',multerOptions))
  @Put('updateproduct/:id')
  async updateProduct(@Param('id') id:string,@Body() product:IUser,@UploadedFile() file: Express.Multer.File){
    const addProduct=await this.productService.updateProduct(product,file,id)
    return addProduct
  }
}
