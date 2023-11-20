// update-todo-list.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todo-list.dto';

export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  readonly name?: string;
  readonly categoryId?: number;
  // Adicione outras propriedades que podem ser atualizadas
}
