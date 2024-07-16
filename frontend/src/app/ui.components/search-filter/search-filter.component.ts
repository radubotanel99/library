import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, NzInputModule, FormsModule],
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {
  @Input() value : string = '';
  @Output() valueChange = new EventEmitter<string>();

  onModelChange(searchedText: string) {
    this.valueChange.emit(searchedText);
  }
}
