import { Observable } from "rxjs";
import { Task } from "../models/task";

export interface TaskInterface {
    getTasks():Observable<Task[]>;
    addTasks(task:Task):Observable<Task>;
    updateTasks(task:Task):Observable<Task>;
    deleteTasks(id:number):Observable<void>;


}