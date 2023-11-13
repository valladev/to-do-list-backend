import { IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  name: string;

  userId: number;
  categoryId: number;
}
