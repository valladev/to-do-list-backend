import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createCategory: CreateCategoryDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`${userId} Usuário nao encontrado`);
    }

    const dtoWithUserId = { ...createCategory, userId };

    const newCategory = await this.prisma.category.create({
      data: dtoWithUserId,
    });

    return newCategory;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    const total = await this.prisma.category.count();
    return { categories, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
