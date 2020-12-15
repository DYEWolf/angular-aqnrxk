import { DecimalPipe } from "@angular/common";
import { Component, QueryList, ViewChildren, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { Student } from "./student";
import { StudentsService } from "./students.service";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";

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

  private _success = new Subject<string>();

  private warning = new Subject<string>();

  staticAlertClosed = false;
  successMessage = "";
  deleteMessage = "";

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: NgbAlert;

  @ViewChild("deleteSelfClosingAlert", { static: false })
  deleteSelfClosingAlert: NgbAlert;

  constructor(public service: StudentsService, public modalService: NgbModal) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this._success.subscribe(message => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.warning.subscribe(message => (this.deleteMessage = message));
    this.warning.pipe(debounceTime(3000)).subscribe(() => {
      if (this.deleteSelfClosingAlert) {
        this.deleteSelfClosingAlert.close();
      }
    });
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
    const answer = window.confirm(
      "Are you sure you want to remove this student?"
    );
    if (answer) {
      this.service.deleteStudent(student);
      this.warning.next(`Student deleted`);
    }
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
        this._success.next(`Student saved successfully`);
      }
    });
  }
}
