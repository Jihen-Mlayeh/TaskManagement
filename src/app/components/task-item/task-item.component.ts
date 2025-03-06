import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!:Task;
  @Output() edit=new EventEmitter<Task>();
  @Output() delete=new EventEmitter<number>();
  

  onEdit():void{
    this.edit.emit(this.task);
  }

  onDelete():void{
    this.delete.emit(this.task.id);
  }



}
