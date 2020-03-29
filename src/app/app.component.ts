import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;

      const redirectUrl = this.authService.redirectUrl || "home";
      this.router.navigate([redirectUrl]);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
