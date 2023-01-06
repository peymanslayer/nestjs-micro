import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { BasicService } from './services/basic.service';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices/enums';
@Module({
  imports: [ClientsModule.register([
    {
      name: 'users',
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: 'users_queue',
        queueOptions: {
          durable: false,
        },
      },
  }
]
)
],
  controllers: [AuthController],
  providers: [AuthService,BasicService],
})
export class AuthModule {}
