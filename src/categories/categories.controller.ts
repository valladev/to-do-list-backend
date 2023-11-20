import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const userId = user.id;
    console.log(userId);
    const newCategory = await this.categoriesService.create(
      userId,
      createCategoryDto,
    );
    return { message: 'Lista criada com sucesso', data: newCategory };
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
