import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSignUpFailed = false;
  error = "";
  showLoader = false;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    this.showLoader = true;
    this.isSignUpFailed = false;
    this.authService.register(this.form.value).subscribe(
      data => {
        this.router.navigate(["sign-in"]);
      },
      err => {
        this.error = err.error;
        this.isSignUpFailed = true;
        this.showLoader = false;
      }
    );
  }

  signIn() {
    this.router.navigate(["sign-in"]);
  }
}
