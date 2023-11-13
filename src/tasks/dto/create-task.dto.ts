import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsNumber()
  listId?: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
