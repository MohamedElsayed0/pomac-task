import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db:AngularFireDatabase) { 

  }

  getTaskes(){
    return this.db.list('/NewTask').valueChanges()
  }
}
