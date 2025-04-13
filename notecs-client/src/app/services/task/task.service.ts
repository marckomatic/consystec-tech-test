import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseApi = environment.apiUrl
  constructor(private http:HttpClient) { }

  createTask(title:string, content:string, date:any, userId: number | undefined){
    let body = {
      title: title, 
      date: new Date().toISOString().split('T')[0], 
      content: content,
      userId: userId,
      completed: false
    }
    return firstValueFrom(this.http.post(this.baseApi + 'tasks/', body));
  }

  getTasks(userId:number | undefined){
    return firstValueFrom(this.http.get(this.baseApi + 'tasks/user/' +userId));

  }

  editTask(task:any){
    task.date =  new Date().toISOString().split('T')[0]
    return firstValueFrom(this.http.put(this.baseApi + 'tasks/'+task.id, task));
  }

  
  completeTask(task:any){
    return firstValueFrom(this.http.put(this.baseApi + 'tasks/'+task.id +'/completed?completed='+!task.completed, null));
  }

    
  deleteTask(task:any){
    return firstValueFrom(this.http.delete(this.baseApi + 'tasks/'+task.id));
  }

}
