import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  listId: number;

  @IsNumber()
  categoryId: number;
}
