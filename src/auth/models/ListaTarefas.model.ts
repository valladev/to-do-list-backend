import { Prisma } from '@prisma/client';
import { Task } from './tarefa.model';
import { Category } from './categoria.model';
import { Drive } from './Drives.model';

export class ToDoList implements Prisma.ToDoListUncheckedCreateInput {
  id?: number;
  name: string;
  userId: number;
  categoryId: number;
  task?: Task[];
  drive?: Drive[];
  category: Category[];
}
