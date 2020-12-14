import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { StudentsComponent } from "./students.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";

import { NgbdSortableHeader } from "./sortable.directive";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, StudentsComponent, NgbdSortableHeader],
  bootstrap: [AppComponent]
})
export class AppModule {}
