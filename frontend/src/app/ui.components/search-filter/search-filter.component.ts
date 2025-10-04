import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, NzInputModule, FormsModule, NzIconModule, TranslateModule],
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
