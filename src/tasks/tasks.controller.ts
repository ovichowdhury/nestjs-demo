import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService) {

    }

    @Get()
    getTasks(@Query() filterTaskDto: FilterTaskDto) : Task[] {
        if(Object.keys(filterTaskDto).length > 0) {
            return this.taskService.getTaskByFilter(filterTaskDto);
        }
        else {
            return this.taskService.getAllTasks();
        }
        
    }

    @Post()
    createTask(@Body() reqBody) : Task {
        return this.taskService.createTask(reqBody.title, reqBody.description);
    }

    @Post('dto')
    createTaskUsingDto(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto);
        return this.taskService.createTaskUsingDto(createTaskDto);
    }

    @Get(':id')
    getTaskById(@Param('id') id: string) : Task {
        console.log(id);
        return this.taskService.getTaskById(id);
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string) : boolean {
        this.taskService.deleteTaskById(id);
        return true;
    }

    @Patch(':id/status')
    patchTaskById(@Param('id') id : string, @Body('status') status: TaskStatus) : Task {
        return this.taskService.patchTaskById(id, status);
    }

    
}
