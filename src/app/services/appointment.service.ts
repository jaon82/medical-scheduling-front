import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
const API_URL = `${environment.apiUrl}`;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any> {
    return this.http.get(`${API_URL}/doctor`, httpOptions);
  }

  createDoctor(doctor): Observable<any> {
    return this.http.post(`${API_URL}/doctor`, doctor, httpOptions);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + "mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
