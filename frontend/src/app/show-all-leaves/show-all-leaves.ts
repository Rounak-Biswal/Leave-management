import { Component, Input } from '@angular/core';
import { ILeave } from '../../models/Leave.model';
import { CommonModule, DatePipe } from "@angular/common"

@Component({
  selector: 'app-show-all-leaves',
  imports: [CommonModule, DatePipe],
  templateUrl: './show-all-leaves.html',
  styleUrl: './show-all-leaves.css'
})
export class ShowAllLeaves {
  @Input() leaves: ILeave[] = [];

  // Pagination variables
  paginatedLeaves: ILeave[] = []
  itemsPerPage = 9
  currentPage = 1
  totalPages = 1
  //----------------------

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
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    this.paginatedLeaves = this.leaves.slice(start, end)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePaginatedLeaves()
    }
  }
  //----------------------------------------

}
