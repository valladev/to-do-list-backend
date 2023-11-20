import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoListsService } from './todo-lists.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTodoListDto: CreateTodoListDto,
  ) {
    const userId = user.id;
    console.log(userId);
    const newList = await this.todoListsService.create(
      userId,
      createTodoListDto,
    );
    return { message: 'Lista criada com sucesso', data: newList };
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.id; // Obter o ID do usuário autenticado
    const lists = await this.todoListsService.findAll(userId);
    return lists;
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id; // Obter o ID do usuário autenticado
    const list = await this.todoListsService.findOne(userId, id);
    return { data: list };
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    const userId = req.user.id; // Obter o ID do usuário autenticado
    const updatedList = await this.todoListsService.update(
      userId,
      id,
      updateTodoListDto,
    );
    return { message: 'Lista atualizada com sucesso', data: updatedList };
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    const deletedList = await this.todoListsService.remove(userId, id);
    return { message: 'Lista excluída com sucesso', data: deletedList };
  }
}
