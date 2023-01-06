import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './services/user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalSerializer } from './local.serializer';
import { AuthService } from './services/auth/auth.service';
import { JoiPipeModule } from 'nestjs-joi/internal/joi-pipe.module';
import { ProductService } from './services/product/product.service';
@Module({
  imports: [ClientsModule.register([{
    name: 'users',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue', // queue name from microservice
          queueOptions: {
            durable: false
          }
        }
      },
      {
      name: 'auth',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue', // queue name from microservice
        queueOptions: {
          durable: false
        }
      }
    },
    {
      name:'product',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'product_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  ]),JoiPipeModule],
  controllers: [AppController],
  providers: [UserService,LocalSerializer,AuthService,ProductService],
})
export class AppModule  {}
