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

  async findAll(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const categories = await this.prisma.category.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });

    const flattenedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      userId: category.userId,
    }));

    console.log(userId);
    const total = categories.length;
    
    if (userId === user.id) {
      return { categories: flattenedCategories, total };
    }
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
