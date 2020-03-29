import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: "doctor-form",
  templateUrl: "./doctor-form.component.html",
  styleUrls: ["./doctor-form.component.css"]
})
export class DoctorFormComponent implements OnInit {
  @Output() newDoctor = new EventEmitter<any>();

  form: FormGroup;
  showLoader = false;
  error;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      crm: new FormControl("", Validators.required)
    });
  }

  clearForm() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value);
    this.showLoader = true;
    this.appointmentService.createDoctor(this.form.value).subscribe(
      data => {
        this.newDoctor.emit(data);
      },
      err => {
        this.error = err.error;
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
        this.clearForm();
      }
    );
  }
}
