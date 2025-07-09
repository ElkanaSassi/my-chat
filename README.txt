## Back-end server NestJS

# Users management:
- Register.
- Login.
- Friends list (for new friend choose from the users stored in the DB).
	- Add and delete.
	- User name is the identification for a user.

# Groups management:
- Create new group.
- Group name.
- Add and delete users.
- List of users in the group.
- *Groups are in a different 'tab' from the DM's.

# Messages manegement:
- How sent.
- Time sent.
- Is the message in DMs or group.

# WebSocket manegement:
- Checks for users status (online/offline). (Dinamicly changing)
- Urgent message option.
- Message when user left the group. (brodcast)




## Front-end client Angular

# Pages
- Login
- Register
- Dm page
- Group page
- *Maybe edit user page

# Importent features
- Remember Me -> "saving" the user in the client, so when he refreshs the page he'll be in the some spot.
- When user is not connects, `redirect` to the login page.
- Unfamiliar page leads to `PageNotPound`.
- Friens list. (with online/offline)
- Add and delete friend. (deleting friend leads to the deletion of the Dm chat).
- New group.
- Chat history.