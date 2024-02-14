import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/updtae-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" retrieving task with ID "${id}"`);
        return this.tasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        this.logger.verbose(`User "${user.username}" deleting task with ID "${id}"`);
        return this.tasksService.deleteTask(id, user);
    }

    @Post()
    @ApiCreatedResponse({ description: 'The task has been successfully created.', type: Task })
    @ApiBadRequestResponse({ description: 'The task could not be created.' })
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
        @Body('status') updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.username}" updating task with ID "${id}" status to "${updateTaskStatusDto.status}"`);
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
