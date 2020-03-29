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
  customers = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.form = new FormGroup({
      doctor: new FormControl("", Validators.required),
      customer: new FormControl("", [Validators.required]),
      date: new FormControl("", Validators.required)
    });
    this.getDoctors();
    this.getCustomers();
  }

  getDoctors() {
    this.appointmentService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  getCustomers() {
    this.appointmentService.getCustomers().subscribe(data => {
      this.customers = data;
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

  onNewCustomer(newCustomer) {
    this.customers.push(newCustomer);
    this.form.controls.customer.setValue(newCustomer.id);
    this.showCustomerForm = false;
  }
}
