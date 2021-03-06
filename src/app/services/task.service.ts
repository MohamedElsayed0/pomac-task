import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db:AngularFireDatabase) { 

  }
  getTaskes(){
    return this.db.list('/NewTask').snapshotChanges()
  }
  getTaskId(id:string){
    return this.db.object(`/NewTask/${id}`).valueChanges();
  }

  updateTask(id,task){
    return this.db.object(`/NewTask/${id}`).update(task);
  }
}
