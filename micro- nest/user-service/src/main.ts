import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport,MicroserviceOptions } from '@nestjs/microservices';


async function bootstrap() {

const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
  transport: Transport.RMQ,
  options: {
    urls: ["amqp://localhost:5672"],
    queue: 'users_queue',
    queueOptions: {
      durable: false,
    },
  },
});

await app.listen()
}
bootstrap();

