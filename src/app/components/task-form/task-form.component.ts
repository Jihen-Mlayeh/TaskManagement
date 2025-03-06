import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  task={} as Task;
  isEdit=false
  constructor(private taskService: TaskService,private route:ActivatedRoute,private router:Router)
  {


  }
  ngOnInit():void
  {
    const taskId=this.route.snapshot.paramMap.get("id");
    if(taskId)
    {
      this.isEdit=true;
      this.taskService.getTasks().subscribe(
        tasks=>{
          const foundTask=tasks.find(t =>t.id===+taskId);
          if(foundTask)
          {
            this.task=foundTask;
          }
        }
      );
    }

  }
  onSubmit()
  {
    if(this.isEdit)
    {
      this.taskService.updateTasks(this.task).subscribe(()=>
      {
        this.router.navigate(['/'])

      }
      )
    }
    else {
      this.taskService.addTasks(this.task).subscribe(()=>
      {
        this.router.navigate(['/'])

      }
      )
    }
    console.log(this.task)
    

  }

}
