import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async getAllTasks(): Promise<{ message: string, tasks: Task[] }> {
        const tasks = await this.tasksRepository.find();
        if (tasks.length === 0) {
            throw new NotFoundException('No tasks found');
        }
        return { message: 'Tasks retrieved successfully', tasks };
    }

    async getTaskById(id: string): Promise<{ message: string, task: Task }> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return { message: 'Task retrieved successfully', task };
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<{ message: string, task: Task }> {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title,
            description,
            done: false,
        });
        const savedTask = await this.tasksRepository.save(task);
        if (!savedTask) {
            throw new InternalServerErrorException('Failed to create task');
        }
        return { message: 'Task created successfully', task: savedTask };
    }

    async updateTask(id: string, updatedTask: Partial<Task>): Promise<{ message: string, task: Task }> {
        const { task } = await this.getTaskById(id);
        Object.assign(task, updatedTask);
        const updated = await this.tasksRepository.save(task);
        return { message: 'Task updated successfully', task: updated };
    }

    async deleteTask(id: string): Promise<{ message: string }> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return { message: 'Task deleted successfully' };
    }
}