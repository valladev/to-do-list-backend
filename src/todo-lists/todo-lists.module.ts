import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';

@Module({
  providers: [TodoListsService]
})
export class TodoListsModule {}
