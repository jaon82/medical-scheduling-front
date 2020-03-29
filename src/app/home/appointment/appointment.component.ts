import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AppointmentService } from "../../services/appointment.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"]
})
export class AppointmentComponent implements OnInit {
  form: FormGroup;
  showDoctorForm = false;
  showCustomerForm = false;
  doctors = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.form = new FormGroup({
      doctor: new FormControl("", Validators.required),
      customer: new FormControl("", [Validators.required]),
      date: new FormControl("", Validators.required)
    });
    this.getDoctors();
  }

  getDoctors() {
    this.appointmentService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  createDoctor() {
    this.showCustomerForm = false;
    this.showDoctorForm = true;
  }

  createCustomer() {
    this.showDoctorForm = false;
    this.showCustomerForm = true;
  }

  onNewDoctor(newDoctor) {
    this.doctors.push(newDoctor);
    this.form.controls.doctor.setValue(newDoctor.id);
    this.showDoctorForm = false;
  }
}
