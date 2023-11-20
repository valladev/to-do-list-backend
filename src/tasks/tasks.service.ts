import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const { listId, categoryId, ...rest } = createTaskDto;

    const data = {
      ...rest,
      user: { connect: { id: userId } },
      list: listId ? { connect: { id: listId } } : undefined,
      category: categoryId ? { connect: { id: categoryId } } : undefined,
    };

    const createdTask = await this.prisma.task.create({ data });

    return createdTask;
  }

  async findAll(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        category: true, // Inclui os dados da categoria relacionada
        user: true,
      },
    });

    const total = await this.prisma.task.count({
      where: {
        userId: userId,
      },
    });

    return { tasks, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
