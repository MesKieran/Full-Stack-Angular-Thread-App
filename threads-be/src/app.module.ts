
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, 
    CommentsModule,
    MongooseModule.forRoot('mongodb+srv://thread-user:wxjk1234@angularthread.srxfn.mongodb.net/thread?retryWrites=true&w=majority&appName=AngularThread')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
