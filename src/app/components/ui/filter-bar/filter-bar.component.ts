import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-bar">
      <input 
        type="text" 
        [(ngModel)]="searchQuery" 
        (ngModelChange)="searchQueryChange.emit($event)" 
        placeholder="Search tickets..." />

      <div class="filters">
        <button *ngFor="let f of filters"
                [class.active]="activeFilter === f"
                (click)="setFilter(f)">
          {{ f }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() filters: string[] = [];
  @Input() activeFilter: string = '';

  // <-- This enables [(searchQuery)] binding in parent
  @Input() searchQuery: string = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  @Output() filterChanged = new EventEmitter<string>();

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterChanged.emit(filter);
  }
}
