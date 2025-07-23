import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../core/services/http/httpConnection.service';
import { LocalStorageService } from '../../../../core/services/localStorage/localStorage.service';
import { ChatSelectionService } from '../../../chat-selection.service';
import { ChatRo } from '../../../../common/ro/chats/chats.type';
import { UserInfoRo } from '../../../../common/ro/users/userInfo.ro';
import { DmRo } from '../../../../common/ro/dms/dms.ro';
import { GroupRo } from '../../../../common/ro/groups/groups.ro';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-sidebar-chat-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './sidebar-chat-list.component.html',
    styleUrl: './sidebar-chat-list.component.css'
})
export class SidebarChatListComponent {
    chats: ChatRo[] = [];
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
        this.addGroupForm = this.fb.group({
            groupName: ['', Validators.required],
            members: this.fb.array([]),
            description: ['', Validators.required]
        });
    }

    ngOnInit() {
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
                    this.chats.push(...res.map(group => group));
                },
                error: (err) => { }
            });
        }
    }

    onChatClicked(chat: ChatRo) {
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
        const group = {
            groupName: this.addGroupForm.value.groupName,
            members: this.addGroupForm.value.members,
            description: this.addGroupForm.value.description,
        }
    }

    onCheckboxChange(event: any, contactId: string) {
        // if (event.target.checked) {
        //     this.contacts.push(this.fb.control(contactId));
        // } else {
        //     const index = this.contacts.controls.findIndex(ctrl => ctrl.value === contactId);
        //     if (index !== -1) this.contacts.removeAt(index);
        // }
    }

}
