﻿import { Component, OnInit, ViewChild } from "@angular/core";
import { AppointmentService } from "../services/appointment.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  appointments: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "doctor", "customer", "date"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getAppointments();
    console.log(this.appointments);
  }

  createAppointment() {
    this.router.navigate(["appointment"]);
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = new MatTableDataSource(data);
      this.parseAppointments();
    });
  }

  parseAppointments() {
    this.appointments.sort = this.sort;
    this.appointments.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "doctor":
          return item.doctor.name;
        case "customer":
          return item.customer.name;
        default:
          return item[property];
      }
    };
    this.appointments.filterPredicate = (data, filter) => {
      const dataStr = `${data.id}${data.doctor.name}${data.customer.name}${data.date}`.toLocaleLowerCase();
      return dataStr.includes(filter);
    };
    setTimeout(() => {
      this.appointments.paginator = this.paginator;
    }, 300);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.appointments.filter = filterValue.trim().toLowerCase();
  }
}
