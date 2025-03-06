import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

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
  drop(event:any,newStatus:'EN_ATTENTE' | 'EN_COURS' |'FAITE')
  {
    if(event.previousContainer!=event.container)
      {
        const tacheActuelle=event.item.data;
        tacheActuelle.status=newStatus;
        this.taskService.updateTasks(tacheActuelle).subscribe(()=>
          {
            transferArrayItem(
              event.previousContainer.data,// delete old data
              event.container.data,// update the new data
              event.previousIndex,// delete old index
              event.currentIndex//update new index
            )
          })

            

      }



  }

}
