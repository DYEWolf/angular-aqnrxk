// import { Component } from "@angular/core";

// import { StudentsDataService } from "./students-data.service";

// interface Student {
//   id: number;
//   name: string;
//   therapies: any;
// }

// @Component({
//   selector: "students",
//   templateUrl: "./students.component.html",
//   styleUrls: ["./students.component.css"]
// })
// export class StudentsComponent {
//   //students: any = [];

//   page = 1;
//   pageSize = 10;
//   students: Student[];
//   collectionSize;
//   studentsArray;

//   // Use the StudentsDataService.getStudents function as a mock API to get students.
//   constructor() {
//     this.getStudents();
//   }

//   getStudents() {
//     StudentsDataService.getStudents().then(res => {
//       this.studentsArray = res;
//       this.collectionSize = this.studentsArray.students.length;
//       this.refreshStudents();
//     });
//   }

//   selectStudent(student: any) {
//     console.log(student);
//   }

//   refreshStudents() {
//     this.students = this.studentsArray.students
//       .map((student, i) => ({ id: i + 1, ...student }))
//       .slice(
//         (this.page - 1) * this.pageSize,
//         (this.page - 1) * this.pageSize + this.pageSize
//       );
//   }
// }

import { DecimalPipe } from "@angular/common";
import { Component, QueryList, ViewChildren } from "@angular/core";
import { Observable } from "rxjs";

import { Student } from "./student";
import { StudentsService } from "./students.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";
import { StudentsDataService } from "./students-data.service";

@Component({
  selector: "students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
  providers: [StudentsService, DecimalPipe]
})
export class StudentsComponent {
  students$: Observable<Student[]>;
  total$: Observable<number>;

  public user = {
    name: "Izzat Nadiri",
    age: 26
  };

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
