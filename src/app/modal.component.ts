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
    console.log(this.student);
  }

  passBack() {
    this.passEntry.emit(this.student);
    this.activeModal.close(this.student);
  }
}
