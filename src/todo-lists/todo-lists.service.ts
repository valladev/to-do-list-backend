import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createTodoListDto: CreateTodoListDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`${userId} Usuário não encontrado`);
    }

    const dtoWithUserId = { ...createTodoListDto, userId };

    const newList = await this.prisma.toDoList.create({
      data: dtoWithUserId,
    });

    return newList;
  }

  async findAll(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const lists = await this.prisma.toDoList.findMany({
      where: { userId },
      include: {
        category: true,
        tasks: true,
      },
    });

    const flattenedLists = lists.map((list) => ({
      id: list.id,
      name: list.name,
      userId: list.userId,
      categoryId: list.categoryId,
      category: list.category,
      tasks: list.tasks,
    }));

    const total = lists.length;

    const totalCompleted = await this.prisma.toDoList.count({
      where: {
        userId: userId,
        completed: true,
      },
    });

    return { lists: flattenedLists, total, totalCompleted };
  }

  async findOne(userId: number, listId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const list = await this.prisma.toDoList.findUnique({
      where: { id: listId, userId },
      include: {
        category: true,
        tasks: true,
      },
    });

    const totalCompleted = await this.prisma.toDoList.count({
      where: {
        userId: userId,
        completed: true,
      },
    });

    if (!list) {
      throw new NotFoundException('Lista não encontrada');
    }

    return { list, totalCompleted };
  }

  async update(
    userId: number,
    listId: number,
    updateTodoListDto: UpdateTodoListDto,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedList = await this.prisma.toDoList.update({
      where: { id: listId, userId },
      data: updateTodoListDto,
    });

    if (!updatedList) {
      throw new NotFoundException('Lista não encontrada');
    }

    return updatedList;
  }

  async remove(userId: number, listId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const deletedList = await this.prisma.toDoList.delete({
      where: { id: listId, userId },
    });

    if (!deletedList) {
      throw new NotFoundException('Lista não encontrada');
    }

    return deletedList;
  }
}
