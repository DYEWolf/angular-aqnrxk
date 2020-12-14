import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  @Input() public student;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  speech = false;
  occupational = false;
  behavioral = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.student.therapies) {
      for (let i = 0; i < 3; i++) {
        if (this.student.therapies[i] === "speech") this.speech = true;
        if (this.student.therapies[i] === "occupational")
          this.occupational = true;
        if (this.student.therapies[i] === "behavioral") this.behavioral = true;
      }
    } else {
    }
  }

  passBack() {
    this.passEntry.emit(this.student);
    this.activeModal.close(this.student);
  }
}
