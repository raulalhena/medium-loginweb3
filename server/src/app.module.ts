import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://loginweb3:loginweb31234@loginweb3.4bh7dfj.mongodb.net/loginweb3',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
