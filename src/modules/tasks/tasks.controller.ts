import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'Tasks retrieved successfully.' })
    async getAllTasks(): Promise<{ message: string, tasks: Task[] }> {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by ID' })
    @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    async getTaskById(@Param() params: GetTaskDto): Promise<{ message: string, task: Task }> {
        return this.tasksService.getTaskById(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<{ message: string, task: Task }> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'Task updated successfully.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    async updateTask(@Param() params: GetTaskDto, @Body() updatedTask: Partial<Task>): Promise<{ message: string, task: Task }> {
        return this.tasksService.updateTask(params.id, updatedTask);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 204, description: 'Task deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    async deleteTask(@Param() params: GetTaskDto): Promise<{ message: string }> {
        return this.tasksService.deleteTask(params.id);
    }
}