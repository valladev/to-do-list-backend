import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
  Req,
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
  async findAll(@Req() req) {
    const userId = req.user.id;
    const categories = await this.categoriesService.findAll(userId);
    return categories;
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
