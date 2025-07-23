import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { ChatSelectionService } from '../../../chat-selection.service';
import { ChatRo } from '../../../../common/ro/chats/chats.type';
import { UserInfoRo } from '../../../../common/ro/users/userInfo.ro';
import { DmRo } from '../../../../common/ro/dms/dms.ro';
import { GroupRo } from '../../../../common/ro/groups/groups.ro';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CreateGroupDto } from '../../../../common/dto/groups/create-group.dto';

@Component({
    selector: 'app-sidebar-chat-list',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
    ],
    templateUrl: './sidebar-chat-list.component.html',
    styleUrl: './sidebar-chat-list.component.css'
})
export class SidebarChatListComponent {
    chats: ChatRo[] = [];
    activeChat: ChatRo;
    @Output() messages = new EventEmitter<string>;
    user: UserInfoRo;
    addGroupForm: FormGroup;
    addGroup: boolean = false;

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private localStorage: LocalStorageService,
        private chatSelectionService: ChatSelectionService,
    ) {
    }

    ngOnInit() {
        this.addGroupForm = this.fb.group({
            groupName: ['', Validators.required],
            members: this.fb.control([], Validators.required),
            description: ['']
        });

        const user = this.localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
            const userId = JSON.parse(user).username;

            this.httpService.get<DmRo[]>(`dms/${userId}`).subscribe({
                next: (res) => {
                    this.chats = res.map(dm => dm);
                },
                error: (err) => { }
            });

            this.httpService.get<GroupRo[]>(`groups/${userId}`).subscribe({
                next: (res) => {
                    console.log('user groups:', res);
                    this.chats.push(...res.map(group => group));
                },
                error: (err) => { }
            });
        }
    }

    onChatClicked(chat: ChatRo) {
        this.activeChat = chat;
        this.chatSelectionService.setSelectedChat(chat);
    }

    chatName(chatId: ChatRo): string {
        if (chatId.chatType === 'Groups') {
            return (chatId as GroupRo).groupName;
        }
        else {
            return this.user.username === chatId.membersList[0]
                ? chatId.membersList[1]
                : chatId.membersList[0];
        }
    }

    onSubmit() {
        const group: CreateGroupDto = {
            groupName: this.addGroupForm.value.groupName,
            membersList: this.addGroupForm.value.members,
            admin: this.user.username,
            description: this.addGroupForm.value.description,
        }
        group.membersList.push(this.user.username);
        console.log('in add group submit', group);

        this.httpService.post<GroupRo>('groups', group).subscribe({
            next: (res) => {
                this.chats.push(res);
            },
            error: (err) => { }
        });
        this.addGroup = false;
    }

}
