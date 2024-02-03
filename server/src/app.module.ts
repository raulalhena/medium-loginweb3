import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://<user>:<password>@<atlas_cluster_identifier>/<database_name>',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
