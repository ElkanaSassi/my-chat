import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../shared/types/user.type';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../../core/services/websocket/websocket.service';
import { SocketEvent } from '../../../core/services/websocket/websocket-events.enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private webSocketService: WebSocketService) {}

  @Input() username: string;
  @Input() birthdate: Date;
  @Input() password: string;

  onAddTask() {
    
    // this.webSocketService.send(,{
    //   username: this.username,
    //   birthdate: this.birthdate,
    //   password: this.password,
    // })
  }
}
