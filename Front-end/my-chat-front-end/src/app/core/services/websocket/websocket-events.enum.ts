export enum SocketEvent {
  Login = 'login',
  Register = 'register',

  SendMessage = 'send_message',
  NewMessage = 'new_message',

  OnlineStatus = 'user_status',

  GetAllUsers = 'get_all_users',
  
  AddContact = 'add_contact',
  DeleteContact = 'delete_contact',

  CreateGroup = 'create_group',
  DeleteGroup = 'delete_group',
  AddContactToGroup = 'add_contact_to_group',
  DeleteContactToGroup = 'delete_contact_to_group',

}