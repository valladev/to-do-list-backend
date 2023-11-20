// movimentacao.model.ts
import { Prisma } from '@prisma/client';

export class Drive implements Prisma.DriveUncheckedCreateInput {
  id?: number;
  description: string;
  listId: number;
  categoryId: number;
  operation: string;
}
