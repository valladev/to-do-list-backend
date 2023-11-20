import { IsString, IsNumber, IsEmpty, IsOptional } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  name: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  categoryId: number | null;
}
