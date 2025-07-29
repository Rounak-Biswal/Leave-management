import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILeave, LeaveForm } from '../../models/Leave.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LEAVE_FORM_CONFIG } from './leave-form.config';

@Component({
  selector: 'app-new-leave',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './new-leave.html',
  styleUrl: './new-leave.css'
})
export class NewLeave implements OnInit {
  http = inject(HttpClient)

  formConfig = LEAVE_FORM_CONFIG;

  successMessage: string = '';

  newLeave: LeaveForm = {
    type: "",
    from_date: "",
    to_date: "",
    reason: "",
    days: 0,
    status: "Pending"
  };


  ngOnInit(): void {

  }

  //api
  applyLeave() {
    const from = new Date(this.newLeave.from_date);
    const to = new Date(this.newLeave.to_date);

    if (to < from) {
      alert("❗ Invalid date range.\nPlease ensure 'To Date' is not earlier than 'From Date'.");
      return;
    }

    let days = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1;
    this.newLeave.days = days;

    this.http.post("http://127.0.0.1:8000/leave/apply", this.newLeave)
      .subscribe(() => {
        this.successMessage = "🎉 Leave successfully submitted!";

        // Reset form
        this.newLeave = {
          type: "",
          from_date: "",
          to_date: "",
          reason: "",
          days: 0,
          status: "Pending"
        };

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      });
  }

}
