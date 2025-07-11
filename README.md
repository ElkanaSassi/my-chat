# Back-end server NestJS

## Users management:
- Register.
- Login.
- Contacts list (for a new contact, choose from the users stored in the DB).
	- Add and delete.
	- User name is the identification for a user.

## Groups management:
- Create a new group.
- Group name and description.
- Add and delete users.
- List of users in the group.
- *Groups are in a different 'tab' from the DM's.

## Messages management:
- How sent (messenger name).
- Time sent.
- Is the message in DMs or group.

## WebSocket manegement:
- Checks for the user's status (online/offline). (Dynamically changing)
- Urgent message option.
- Message when the user leaves the group. (broadcast)


# Front-end client Angular

## Pages
- Login
- Register
- Dm page
- Group page
- Contact tab. (with option to add new contacts from the user pool)
- *Maybe edit user page

## Important features
- Remember Me -> "saving" the user in the client, so when he refreshes the page, he'll be in the same spot.
- When the user is not connected, `redirect` to the login page.
- Unfamiliar page leads to `PageNotPound`.
- Contacts list. (with online/offline)
- Add and delete contacts. (Deleting a contact leads to the deletion of the Dm chat)
- New group.
<<<<<<< HEAD
- Chat history.
=======
- Chat history.
>>>>>>> 55e7394c27bdd07a1ed55c773205731cfff32a64
