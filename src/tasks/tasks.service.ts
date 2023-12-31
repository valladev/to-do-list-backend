import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

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
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
    });

    const total = await this.prisma.task.count({
      where: {
        userId: userId,
      },
    });

    const totalCompleted = await this.prisma.task.count({
      where: {
        userId: userId,
        completed: true,
      },
    });

    return { tasks, total, totalCompleted, user };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async completeTask(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed },
    });

    return updatedTask;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
