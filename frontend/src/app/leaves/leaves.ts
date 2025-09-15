import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ILeave } from '../../models/Leave.model';
import { localAPI } from '../../api/routes.local';
import { prodAPI } from '../../api/routes.prod';

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
    this.http.get(`${prodAPI.allLeaves}`).subscribe((res: any) => {
      this.allLeaveData = res
    })
  }
}
