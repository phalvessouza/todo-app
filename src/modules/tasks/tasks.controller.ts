import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAllTasks(): Promise<{ message: string, tasks: Task[] }> {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param() params: GetTaskDto): Promise<{ message: string, task: Task }> {
        return this.tasksService.getTaskById(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<{ message: string, task: Task }> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch(':id')
    async updateTask(@Param() params: GetTaskDto, @Body() updatedTask: Partial<Task>): Promise<{ message: string, task: Task }> {
        return this.tasksService.updateTask(params.id, updatedTask);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTask(@Param() params: GetTaskDto): Promise<{ message: string }> {
        return this.tasksService.deleteTask(params.id);
    }
}