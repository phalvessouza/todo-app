// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            done: false,
        };
        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, updatedTask: Partial<Task>): Task {
        let task = this.getTaskById(id);
        if (task) {
            task = { ...task, ...updatedTask };
            this.tasks = this.tasks.map(t => (t.id === id ? task : t));
        }
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}