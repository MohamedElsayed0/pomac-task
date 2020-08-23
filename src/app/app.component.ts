import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { ColumnService } from './services/column.service';
import { TaskService } from './services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mainLists = [];
  taskList = [];
  doneList = [];
  columnList = ["hello"];
  id;


  constructor(private fb: FormBuilder,
    private columnService: ColumnService,
    private db: AngularFireDatabase,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,) {


    this.mainLists.push(this.taskList)
    this.mainLists.push(this.doneList)
    /// GET COLUMNS
    this.columnService.getColumnNames().subscribe((names: any) => {
      this.columnList = names;
      let index = (names.length) - (this.mainLists.length);
      for (let i = 0; i < index; i++) {
        let newcol = [];
        this.mainLists.push(newcol)
      }
    });
    // GET TASKS
    this.taskService.getTaskes().subscribe((data) => {
      data.forEach(element => {
        this.taskList.push(element);
      });
    })
  }
///////// NEW TASK FORM
  newTaskForm: FormGroup = this.fb.group({
    taskeTitle: ['', Validators.required],
    description: ['', Validators.required],
    selectUser: ['', Validators.required],
    date: ['',]
  })

  get taskeTitle() {
    return this.newTaskForm.controls.taskeTitle
  }
  get description() {
    return this.newTaskForm.controls.description
  }
  get selectUser() {
    return this.newTaskForm.controls.selectUser
  }
  get date() {
    return this.newTaskForm.controls.date
  }
  ////////////////////////////////
  //// SUBMIT TASK
  onSubmitTask(taskfaild: HTMLInputElement) {
    this.db.list('NewTask').push(this.newTaskForm.value)
  }

  //////// Edite user 
  edite(i) {
    this.id = this.activatedRoute.snapshot.queryParamMap.get("currentId");
    if (this.id) {
      this.taskService.getTaskId(this.id).subscribe((item: any) => {

        this.taskeTitle.setValue(item.taskeTitle);
        this.description.setValue(item.description);
        this.date.setValue(item.date);
        this.selectUser.setValue(item.selectUser);

      })
    }
  }

  updateTask(){
    this.taskService.updateTask(this.id,this.newTaskForm.value)
  }
  /////////// new column form
  newColumnForm: FormGroup = this.fb.group({
    columnName: ['', Validators.required]
  });
  get columnName() {
    return this.newColumnForm.controls.columnName
  }
////////////////////////////////////////
/// submit column
  onSubmit(taskfaild: HTMLInputElement) {
    taskfaild.value = '';
    this.db.list('columnNames').push(this.columnName.value)
  }
////////////////////////////////////////
//// drag and drop elements
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("hi");
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log("no", event);
    }
  }
  ngOnInit(): void {

  }
}
