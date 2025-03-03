import { Injectable } from '@angular/core';
import { TaskInterface } from './task.interface';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService  implements TaskInterface{
  private apiUrl='http://localhost:8080/api/tasks'

  constructor( private http:HttpClient) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  addTasks(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  updateTasks(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  deleteTasks(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
