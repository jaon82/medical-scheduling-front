import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "doctor-form",
  templateUrl: "./doctor-form.component.html",
  styleUrls: ["./doctor-form.component.css"]
})
export class DoctorFormComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      crm: new FormControl("")
    });
  }
}
