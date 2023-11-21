import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { number } from 'react-admin';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userId = user.id;
    console.log(userId);
    const newList = await this.tasksService.create(userId, createTaskDto);
    return { message: 'Task criada', data: newList };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const userId = user.id;
    const tasks = await this.tasksService.findAll(userId);

    return tasks;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  async completeTask(@Param('id') id: number, @CurrentUser() user: User) {
    const userId = user.id;
    const updateTask = await this.tasksService.completeTask(id, userId);
    return { message: 'Task marked as completed', data: updateTask };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
