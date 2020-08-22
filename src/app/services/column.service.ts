import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private db:AngularFireDatabase) { 

  }

  getColumnNames(){
    return this.db.list('/columnNames').valueChanges()
  }
}
