import { Component } from '@angular/core';
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";

@Component({
    selector: 'app-chat-window',
    imports: [ChatHeaderComponent, MessageListComponent, MessageInputComponent],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent { }
