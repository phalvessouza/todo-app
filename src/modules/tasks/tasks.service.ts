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

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.tasksRepository.find();
        if (tasks.length === 0) {
            throw new NotFoundException('No tasks found');
        }
        return tasks;
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
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
        return savedTask;
    }

    async updateTask(id: string, updatedTask: Partial<Task>): Promise<Task> {
        const task = await this.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        Object.assign(task, updatedTask);
        await this.tasksRepository.save(task);
        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return;
    }
}