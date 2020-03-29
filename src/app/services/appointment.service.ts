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

  getCustomers(): Observable<any> {
    return this.http.get(`${API_URL}/customer`, httpOptions);
  }

  createCustomer(customer): Observable<any> {
    return this.http.post(`${API_URL}/customer`, customer, httpOptions);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${API_URL}/appointment`, httpOptions);
  }

  createAppointment(appointment): Observable<any> {
    return this.http.post(
      `${API_URL}/appointment/doctor/${appointment.doctor}/customer/${appointment.customer}`,
      { date: appointment.date },
      httpOptions
    );
  }
}
