import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        if (this.tasks.length === 0) {
            throw new NotFoundException('Nenhuma task encontrada');
        }
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            done: false,
        };
        this.tasks.push(task);

        // Verifica se a tarefa foi adicionada com sucesso
        const createdTask = this.tasks.find(t => t.id === task.id);
        if (!createdTask) {
            throw new InternalServerErrorException('Failed to create task');
        }

        return task;
    }

    updateTask(id: string, updatedTask: Partial<Task>): Task {
        let task = this.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        task = { ...task, ...updatedTask };
        this.tasks = this.tasks.map(t => (t.id === id ? task : t));

        // Verifica se a tarefa foi atualizada com sucesso
        const updated = this.tasks.find(t => t.id === id && t !== task);
        if (updated) {
            throw new InternalServerErrorException('Failed to update task');
        }

        return task;
    }

    deleteTask(id: string): void {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);

        // Verifica se a tarefa foi deletada com sucesso
        if (this.tasks.length === initialLength) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        const deletedTask = this.tasks.find(task => task.id === id);
        if (deletedTask) {
            throw new InternalServerErrorException('Failed to delete task');
        }
    }
}