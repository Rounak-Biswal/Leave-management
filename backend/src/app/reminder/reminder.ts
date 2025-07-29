import { Component, Input } from '@angular/core';
import { ILeave, ILeaveWithDaysLeft } from '../../models/Leave.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reminder',
  imports: [CommonModule],
  templateUrl: './reminder.html',
  styleUrl: './reminder.css'
})
export class Reminder {
  @Input() reminders: ILeaveWithDaysLeft[] = []
}
