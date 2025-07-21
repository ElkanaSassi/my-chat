import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../core/services/http/httpConnection.service';
import { Message } from '../../../shared/types/message.type';

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
    messageText: string = '';

    constructor(
        private httpService: HttpService,
    ) { }

    sendMessage() {
        const trimmed = this.messageText.trim();
        if (trimmed) {
            this.httpService.post<Message>('',{});
            this.messageText = '';
        }
    }

}
