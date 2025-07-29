import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILeave } from '../../models/Leave.model';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves implements OnInit {
  http = inject(HttpClient)
  allLeaveData: ILeave[] = []

  ngOnInit(): void {

  }

  getLeaves() {
    this.http.get("http://127.0.0.1:8000/leave/all").subscribe((res: any) => {
      this.allLeaveData = res
    })
  }
}
