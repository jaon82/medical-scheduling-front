import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
const AUTH_API = `${environment.apiUrl}/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + "signin",
      {
        email: credentials.email,
        password: credentials.password
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
        name: user.name,
        email: user.email,
        password: user.password
      },
      httpOptions
    );
  }
}
