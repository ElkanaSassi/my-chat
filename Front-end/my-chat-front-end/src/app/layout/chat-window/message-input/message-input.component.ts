import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  messageText: string = '';
  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    const trimmed = this.messageText.trim();
    if (trimmed) {
      this.messageSent.emit(trimmed);
      this.messageText = ''; // Clear input
    }
  }

}
