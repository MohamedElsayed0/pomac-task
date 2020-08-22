import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { ColumnService } from './services/column.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Pomac-task';
  mainLists = [];
  taskList = [
    { taskeTitle: 'Lorem ipsum', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet aliquam ipsam quos praesentium similique quo.', selectUser: ["mohamed"], date: '22/8/2020' },

  ];
  doneList = [];
  columnList = [];



  constructor(private fb: FormBuilder,
    private columnService: ColumnService,
    private db: AngularFireDatabase,
    private taskService: TaskService) {


    this.mainLists.push(this.taskList)
    this.mainLists.push(this.doneList)

    this.columnService.getColumnNames().subscribe((names: any) => {
      this.columnList = names;
      let index = (names.length) - (this.mainLists.length);
      console.log(index)
      for (let i = 0; i < index; i++) {
        let newTask = [];
        this.mainLists.push(newTask);
      }
    });

    this.taskService.getTaskes().subscribe((task: any) => {
      console.log(task)
      this.taskList.push(task);
      for (const iterator of task) {
        this.taskList.push(iterator);
      }
      console.log(this.taskList)

    })

  }
  ngOnInit(): void {

  }

  newColumnForm: FormGroup = this.fb.group({
    columnName: ['', Validators.required]
  });

  get columnName() {
    return this.newColumnForm.controls.columnName
  }

  onSubmit(taskfaild: HTMLInputElement) {
    taskfaild.value = '';
    this.db.list('columnNames').push(this.columnName.value)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
