import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() text: string = 'Default Text';
  // @Input() color: string = 'blue'; 
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
