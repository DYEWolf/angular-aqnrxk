import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "modal-component",
  templateUrl: "./modal.component.html"
})
export class ModalComponent implements OnInit {
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.user);
  }

  passBack() {
    this.passEntry.emit(this.user);
    this.activeModal.close(this.user);
  }
}
