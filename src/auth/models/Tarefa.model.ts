import { Prisma } from '@prisma/client';

export class Task implements Prisma.TaskUncheckedCreateInput {
  id?: number;
  description: string;
  completed: boolean;
  listId: number;
  categoryId: number;
  userId: number;
}
