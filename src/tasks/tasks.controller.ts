// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body('title') title: string, @Body('description') description: string): Task {
        return this.tasksService.createTask(title, description);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updatedTask: Partial<Task>): Task {
        return this.tasksService.updateTask(id, updatedTask);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}