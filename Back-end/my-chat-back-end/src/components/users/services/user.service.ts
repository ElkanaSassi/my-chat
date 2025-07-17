import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from 'src/schemas/users/users.schema';
import { CreateUserDto } from '../../../dtos/users/create-user.dto';
import { ContactsDto } from '../../../dtos/users/add-contacts.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<Users>
    ) {

    }

    getAllUsers() {
        // Find all with no filter -> gets all the records stored in the DB.
        return this.usersModel.find();
    }

    async getUsers(usernames: Types.ObjectId[]) {
        return this.usersModel.find({ _id: { $in: usernames } }).exec();
    }

    async getUserByUserName(username: string): Promise<Users> {
        const user = await this.usersModel.findOne({ username }).exec();
        if (!user) throw new NotFoundException(`Invalid Username: Could't find user: ${username}.`);

        return user;
    }

    async getUserById(userId: Types.ObjectId): Promise<Users> {
        const user = await this.usersModel.findById({ userId }).exec();
        if (!user) throw new NotFoundException(`Invalid UserId: Could't find user with id: ${userId}.`);

        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.usersModel(createUserDto);
        return await newUser.save();
    }

    async updateUserByUserName(username: string, updateUserDto: Partial<CreateUserDto>) {
        const updatedUser = await this.usersModel.findOneAndUpdate({ username }, updateUserDto).exec();
        if (!updatedUser) throw new NotFoundException(`UPDATE USER FAILD: Invalid Username. Could't find user '${username}'.`);

        return updatedUser;
    }

    async removeUserByUserName(username: string) {
        const deletedUser = await this.usersModel.findByIdAndDelete({ username }).exec();
        if (!deletedUser) throw new NotFoundException(`DELETE USER FAILD: Invalid Username. Could't find user '${username}'.`);

        await this.usersModel.updateMany(
            { contacts: username }, // To get all users with this username in contacts.
            { $pull: { contacts: username } } // $pull deletes the username from contacts.
        );

        return deletedUser;
    }

    async addContactsToUser(username: string, userContactsdDto: ContactsDto) {
        const contactIdsToAdd = await this.getValidContacts(userContactsdDto);

        return await this.usersModel.findOneAndUpdate({ username }, { contacts: contactIdsToAdd }).exec();
    }

    async removeContactsFromUser(username: string, userContactsdDto: ContactsDto) {
        const contactIdsToRemove = await this.getValidContacts(userContactsdDto);

        return await this.usersModel.findOneAndUpdate(
            { username },
            { $pull: { contacts: contactIdsToRemove } },
            { new: true }
        ).exec();
    }

    private async getValidContacts(userContactsdDto: ContactsDto) {
        const usernames = userContactsdDto.contacts;

        const { contactIds, contactNames } = await this.mapingContactDto(usernames);

        const foundUsernames = new Set(contactNames); // set -> unique 
        const notFound = usernames.filter(name => !foundUsernames.has(name));
        if (notFound.length) throw new NotFoundException(`Faild: Users not found: ${notFound.join(', ')}`);

        return contactIds;
    }

    private async mapingContactDto(usernames: string[]) {
        // Geting the id for each username 
        const contacts = await this.usersModel.find({
            username: { $in: usernames },
        }, '_id').exec();

        // Making an array for contactIds and contactNames.
        const contactIds = contacts.map((user) => user._id);
        const contactNames: string[] = contacts.map((user) => user.username);

        return { contactIds, contactNames };
    }
}
