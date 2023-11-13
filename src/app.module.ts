import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DrivesModule } from './drives/drives.module';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TodoListsController } from './todo-lists/todo-lists.controller';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { CategoriesModule } from './categories/categories.module';
import { TodoListsService } from './todo-lists/todo-lists.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    DrivesModule,
    TasksModule,
    TodoListsModule,
    CategoriesModule,
  ],
  controllers: [AppController, TodoListsController],
  providers: [
    TodoListsService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TasksService,
  ],
})
export class AppModule {}
