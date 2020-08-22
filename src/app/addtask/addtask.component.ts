import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {


  constructor(private fb:FormBuilder , 
              private db:AngularFireDatabase) { 


  }
      newTaskForm:FormGroup = this.fb.group({
          taskeTitle:['',Validators.required],
          description:['',Validators.required],
          selectUser:['',Validators.required],
          date:['',Validators.required]
      })
    
    get taskeTitle(){
      return this.newTaskForm.controls.taskeTitle
    }
    get description(){
      return this.newTaskForm.controls.description
    }
    get selectUser(){
      return this.newTaskForm.controls.selectUser
    }
    get date(){
      return this.newTaskForm.controls.date
    }

    onSubmit(taskfaild:HTMLInputElement){
      this.db.list('NewTask').push(this.newTaskForm.value)
      taskfaild.value = '';
    }
   ngOnInit(): void {
  
  }

}
