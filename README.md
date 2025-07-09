# Back-end server NestJS

## Users management:
- Register.
- Login.
- Friends list (for a new friend, choose from the users stored in the DB).
	- Add and delete.
	- User name is the identification for a user.

## Groups management:
- Create a new group.
- Group name.
- Add and delete users.
- List of users in the group.
- *Groups are in a different 'tab' from the DM's.

## Messages management:
- How sent.
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
- *Maybe edit user page

## Important features
- Remember Me -> "saving" the user in the client, so when he refreshes the page, he'll be in the same spot.
- When the user is not connected, `redirect` to the login page.
- Unfamiliar page leads to `PageNotPound`.
- Friends list. (with online/offline)
- Add and delete friends. (Deleting a friend leads to the deletion of the Dm chat)
- New group.
- Chat history.