import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-widget',
  imports: [CommonModule],
  templateUrl: './stat-widget.html',
  styleUrl: './stat-widget.css'
})
export class StatWidget {
  @Input() count: number = 0;
  @Input() label: string = "";
  @Input() bg: string = ""
}
