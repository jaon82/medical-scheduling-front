﻿import { Component, OnInit, ViewChild } from "@angular/core";
import { AppointmentService } from "../services/appointment.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  appointments: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "doctor", "customer", "data"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getAppointments();
  }

  createAppointment() {
    this.router.navigate(["appointment"]);
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = new MatTableDataSource(data);
      setTimeout(() => {
        this.appointments.paginator = this.paginator;
      }, 300);
    });
  }
}
