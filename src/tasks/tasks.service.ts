import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [] 

    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTaskByFilter(filter: FilterTaskDto) : Task[] {
        const {status, search} = filter;
        let tasks: Task[] = this.getAllTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
        
    }

    createTask(title: string, description: string) : Task {
        const task : Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    createTaskUsingDto(createTaskDto: CreateTaskDto) : Task {
        const {title, description} = createTaskDto;
        const task : Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string) : Task {
        return this.tasks.find(task => task.id === id);

    }

    deleteTaskById(id: string) {
        const index: number = this.tasks.findIndex(t => t.id === id);
        if(index > -1) this.tasks.splice(index);
    }

    patchTaskById(id: string, taskStatus: TaskStatus) : Task {
        const task : Task = this.getTaskById(id);
        task.status = taskStatus;
        return task;

    }

}
