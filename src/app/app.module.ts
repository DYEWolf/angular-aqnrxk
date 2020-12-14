import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { StudentsComponent } from "./students.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";

import { NgbdSortableHeader } from "./sortable.directive";
import { ModalComponent } from "./modal.component";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    StudentsComponent,
    NgbdSortableHeader,
    ModalComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
