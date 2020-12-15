import { DecimalPipe } from "@angular/common";
import { Component, QueryList, ViewChildren } from "@angular/core";
import { Observable } from "rxjs";

import { Student } from "./student";
import { StudentsService } from "./students.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
  providers: [StudentsService, DecimalPipe]
})
export class StudentsComponent {
  students$: Observable<Student[]>;
  total$: Observable<number>;

  faTrash = faTrash;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: StudentsService, public modalService: NgbModal) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  selectStudent(student: any) {
    this.openModal("edit", student);
  }

  deleteStudent(student) {
    this.service.deleteStudent(student);
  }

  openModal(mode, data) {
    let student;
    if (mode === "new") {
      student = data = {
        id: "",
        name: ""
      };
    } else {
      student = data;
    }
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.student = student;
    modalRef.result.then(result => {
      if (student) {
        if (mode === "new") this.service.addStudent(student);
        if (mode === "edit") this.service.editStudent(student);
      }
    });
  }
}
