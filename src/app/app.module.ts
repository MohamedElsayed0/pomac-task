import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AddtaskComponent } from './addtask/addtask.component';


@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    DateInputsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
