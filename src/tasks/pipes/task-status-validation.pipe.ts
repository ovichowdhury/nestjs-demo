import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
    TaskStatus.DONE
  ]
  
  transform(value: any, metadata: ArgumentMetadata) {
    const index = this.allowedStatus.indexOf(value.toUpperCase());
    if(index > -1)
      return index;
    else 
      throw new BadRequestException(`${value} is not a valid status`);
  }
}
