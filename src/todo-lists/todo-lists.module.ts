import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { TodoListsController } from './todo-lists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TodoListsController],
  providers: [TodoListsService],
})
export class TodoListsModule {}
