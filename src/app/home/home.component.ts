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
  appointments = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "doctor", "customer", "date", "delete"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getAppointments();
    console.log(this.dataSource);
  }

  createAppointment() {
    this.router.navigate(["appointment"]);
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data;
      this.parseAppointments();
    });
  }

  parseAppointments() {
    this.dataSource = new MatTableDataSource(this.appointments);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "doctor":
          return item.doctor.name;
        case "customer":
          return item.customer.name;
        default:
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = `${data.id}${data.doctor.name}${data.customer.name}${data.date}`.toLocaleLowerCase();
      return dataStr.includes(filter);
    };
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 300);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(element) {
    this.appointmentService.delete(element.id).subscribe(() => {
      this.appointments = this.appointments.filter(item => item.id != element.id);
      this.parseAppointments();
    });
  }
}
