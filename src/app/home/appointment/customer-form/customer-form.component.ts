import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: "customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  @Output() newCustomer = new EventEmitter<any>();

  form: FormGroup;
  showLoader = false;
  error;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      cpf: new FormControl("", Validators.required),
      telefone: new FormControl("")
    });
  }

  clearForm() {
    this.form.reset();
  }

  onSubmit() {
    this.showLoader = true;
    this.appointmentService.createCustomer(this.form.value).subscribe(
      data => {
        this.newCustomer.emit(data);
      },
      err => {
        this.error = err.error;
      },
      () => {
        this.showLoader = false;
        this.clearForm();
      }
    );
  }
}
