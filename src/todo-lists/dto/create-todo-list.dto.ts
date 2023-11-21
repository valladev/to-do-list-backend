import { IsString, IsNumber, IsEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  name: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  categoryId: number | null;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
