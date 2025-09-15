import { CommonModule, DatePipe } from "@angular/common"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IEditLeaveForm, ILeave } from '../../models/Leave.model';
import { FormsModule } from "@angular/forms";
import { EDIT_LEAVE_FORM_CONFIG } from './edit-leave-form.config';
import { localAPI} from '../../api/routes.local';
import { prodAPI } from "../../api/routes.prod";


@Component({
  selector: 'app-my-leaves',
  imports: [HttpClientModule, DatePipe, CommonModule, FormsModule],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css'
})
export class MyLeaves implements OnInit {
  http = inject(HttpClient)
  allLeaveData: ILeave[] = []

  //filter
  selectedStatus: string = "All";
  filteredLeaves: ILeave[] = [];


  //view detail
  currLeave: ILeave | null = null

  //delete confirmation
  dltConfirm: ILeave | null = null

  //edit form
  formConfig = EDIT_LEAVE_FORM_CONFIG;
  editLeave: IEditLeaveForm | null = null

  // Pagination variables
  paginatedLeaves: ILeave[] = []
  itemsPerPage = 6
  currentPage = 1
  totalPages = 1
  //----------------------

  ngOnInit(): void {
    this.getLeaves()
  }

  //api
  // getLeaves() {
  //   this.http.get(`${prodAPI.allLeaves}`)
  //     .subscribe((res: any) => {
  //       this.allLeaveData = res
  //       this.totalPages = Math.ceil(this.allLeaveData.length / this.itemsPerPage)
  //       this.updatePaginatedLeaves()
  //     })
  // }

  //filter function
  getLeaves() {
    this.http.get(`${prodAPI.allLeaves}`).subscribe((res: any) => {
      this.allLeaveData = res;
      this.filterByStatus(); // Apply filtering + pagination
    });
  }

  filterByStatus() {
    if (this.selectedStatus === "All") {
      this.filteredLeaves = [...this.allLeaveData];
    } else {
      this.filteredLeaves = this.allLeaveData.filter(leave => leave.status === this.selectedStatus);
    }

    this.totalPages = Math.ceil(this.filteredLeaves.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedLeaves(); // now uses filtered data
  }

  //------------------------  

  id: string = "688540c565661e8177eec4ac"
  showLeave(id: string) {
    this.http.get(`${prodAPI.oneLeave}${id}`)
      .subscribe((res: any) => {
        this.currLeave = res;
      })
  }

  deleteLeave(id: string) {
    this.http.delete(`${prodAPI.oneLeave}${id}/delete`)
      .subscribe((res: any) => {
        this.getLeaves()
        this.closeBtn()
      })
  }

  updateLeave(id: string) {
    if (this.editLeave) {
      let from = new Date(this.editLeave.from_date)
      let to = new Date(this.editLeave.to_date)
      //invalid date validation
      if (to < from) {
        alert("❗ Invalid date range.\nPlease ensure 'To Date' is not earlier than 'From Date'.");

        return;
      }
      let days = to.getTime() - from.getTime()    //return milliseconds
      this.editLeave.days = (days / (1000 * 60 * 60 * 24)) + 1   //convert ms -> day
    }
    this.http.put(`${prodAPI.oneLeave}${id}/update`, this.editLeave)
      .subscribe((res: any) => {
        this.getLeaves()
        this.closeBtn()
      })
  }
  //-------------------------------------

  //change "status" bg color
  getStatusClassName(value: string) {
    if (value == "Pending")
      return "bg-warning-subtle p-2 rounded-1"
    else if (value == "Approved")
      return "bg-success-subtle p-2 rounded-1"
    else (value == "Rejected")
    return "bg-danger-subtle p-2 rounded-1"
  }
  //-------------------------------

  //pagination
  updatePaginatedLeaves() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedLeaves = this.filteredLeaves.slice(start, end);
  }


  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePaginatedLeaves()
    }
  }
  //----------------------------------------

  //modal display
  closeBtn() {
    this.currLeave = null;
    this.dltConfirm = null;
    this.editLeave = null
  }

  //modal delete confirmation
  askConfirmation(id: string) {
    this.http.get(`${prodAPI.oneLeave}${id}`)
      .subscribe((res: any) => {
        this.dltConfirm = res;
      })
  }

  //modal edit form
  showEditForm(id: string) {
    this.http.get(`${prodAPI.oneLeave}${id}`)
      .subscribe((res: any) => {
        const formatDate = (dateStr: string) => {
          const d = new Date(dateStr);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        res.from_date = formatDate(res.from_date);
        res.to_date = formatDate(res.to_date);
        this.editLeave = res;
        console.log(this.editLeave)
      })
  }
}
