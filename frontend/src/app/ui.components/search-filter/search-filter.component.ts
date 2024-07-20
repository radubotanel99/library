import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, NzInputModule, FormsModule, NzIconModule,],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css',
})
export class SearchFilterComponent {
  @Input() value : string = '';
  @Output() valueChange = new EventEmitter<string>();

  onModelChange(searchedText: string) {
    this.valueChange.emit(searchedText);
  }
}
