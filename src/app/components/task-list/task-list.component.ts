import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  tasks:Task[]=[]
  searchText:string="";
  enAttenteTasks:Task[]=[]
  enCoursTasks:Task[]=[]
  FaitTasks:Task[]=[]


  constructor(private taskService:TaskService){

  }
  ngOnInit(): void {
    this.loadTasks();
   
  }
  loadTasks(): void{
    this.taskService.getTasks().subscribe(data=>{
      this.tasks=data;
    })
    this.updateTaskLists();
  }
  updateTaskLists():void
  {
    this.enAttenteTasks=this.tasks.filter(t=>t.status==='EN_ATTENTE');
    this.FaitTasks=this.tasks.filter(t=>t.status==='FAITE');
    this.enCoursTasks=this.tasks.filter(t=>t.status==='EN_COURS');
  }
  filterTask():void{
    const filtered=this.tasks.filter(
      task=>task.title.toLowerCase()
      .includes(this.searchText.toLowerCase())
      || task.description?.toLocaleLowerCase()
      .includes(this.searchText.toLowerCase()));

    this.enAttenteTasks=filtered.filter(t=>t.status==='EN_ATTENTE');
    this.FaitTasks=filtered.filter(t=>t.status==='FAITE');
    this.enCoursTasks=filtered.filter(t=>t.status==='EN_COURS');

  }

}
