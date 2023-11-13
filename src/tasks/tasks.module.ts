import { Module } from '@nestjs/common';
import { TasksService } from './TasksService';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
