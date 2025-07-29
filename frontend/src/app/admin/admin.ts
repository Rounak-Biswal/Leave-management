import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILeave } from '../../models/Leave.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { concat } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [DatePipe, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  http = inject(HttpClient)

  allLeaveData: ILeave[] = []
  currLeave: ILeave | null = null
  approvedData: ILeave | null = null
  rejectedData: ILeave | null = null

  //filter
  selectedStatus: string = "All";


  // Pagination variables
  paginatedLeaves: ILeave[] = []
  itemsPerPage = 4
  currentPage = 1
  totalPages = 1

  ngOnInit(): void {
    this.getLeavesForAdmin()
  }

  //api
  //get all leaves
  getLeavesForAdmin() {
    this.http.get("http://127.0.0.1:8000/leave/all")
      .subscribe((res: any) => {
        this.allLeaveData = res;
        let pending = this.allLeaveData.filter((leave) => leave.status === "Pending")
        let others = this.allLeaveData.filter((leave) => leave.status !== "Pending")
        this.allLeaveData = pending.concat(others)
        this.totalPages = Math.ceil(this.allLeaveData.length / this.itemsPerPage)
        this.filterByStatus()
      })
  }
  //save leave record into variable
  getLeaveData(id: string) {
    this.http.get(`http://127.0.0.1:8000/leave/${id}`)
      .subscribe((res: any) => {
        this.currLeave = res;
      })
  }
  //approve leave
  approveLeave(leave: ILeave) {
    leave.status = "Approved"
    this.http.put(`http://127.0.0.1:8000/leave/${leave.id}/update`, leave)
      .subscribe((res) => {
        this.getLeavesForAdmin()
      })
  }

  //reject leave
  rejectLeave(leave: ILeave) {
    leave.status = "Rejected"
    this.http.put(`http://127.0.0.1:8000/leave/${leave.id}/update`, leave)
      .subscribe((res) => {
        this.getLeavesForAdmin()
      })
  }

  //change "status" bg color
  getStatusClassName(value: string) {
    if (value == "Pending")
      return "bg-warning-subtle p-2 rounded-1"
    else if (value == "Approved")
      return "bg-success-subtle p-2 rounded-1"
    else (value == "Rejected")
    return "bg-danger-subtle p-2 rounded-1"
  }

  //pagination
  updatePaginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    this.paginatedLeaves = this.allLeaveData.slice(start, end)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePaginatedLeaves()
    }
  }

  //filter function
  filterByStatus() {
    let filteredData = this.allLeaveData
    if (this.selectedStatus !== "All") {
      filteredData = this.allLeaveData.filter((leave) => {
        return leave.status === this.selectedStatus
      })
    }

    this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage)
    this.currentPage = 1
    this.paginatedLeaves = filteredData.slice(0, this.itemsPerPage)
  }
}
