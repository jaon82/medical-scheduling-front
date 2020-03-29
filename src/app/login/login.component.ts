import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TokenStorageService } from "../services/token-storage.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  error;
  showLoader = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.showLoader = true;
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;

        this.reloadPage();
      },
      err => {
        this.error = err;
        this.isLoginFailed = true;
        this.showLoader = false;
        setTimeout(() => {
          this.isLoginFailed = false;
        }, 2000);
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  signUp() {
    this.router.navigate(["sign-up"]);
  }
}
