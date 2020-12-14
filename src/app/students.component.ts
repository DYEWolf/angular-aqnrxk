import { Component } from "@angular/core";

import { StudentsDataService } from "./students-data.service";

interface Student {
  id: number;
  name: string;
  therapies: any;
}

@Component({
  selector: "students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})
export class StudentsComponent {
  //students: any = [];

  page = 1;
  pageSize = 10;
  students: Student[];
  collectionSize;
  studentsArray;

  // Use the StudentsDataService.getStudents function as a mock API to get students.
  constructor() {
    this.getStudents();
  }

  getStudents() {
    StudentsDataService.getStudents().then(res => {
      this.studentsArray = res;
      this.collectionSize = this.studentsArray.students.length;
      this.refreshStudents();
    });
  }

  selectStudent(student: any) {
    console.log(student);
  }

  refreshStudents() {
    this.students = this.studentsArray.students
      .map((student, i) => ({ id: i + 1, ...student }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
