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

    public getAllUsers(): Promise<Users[]> {
        // Find all with no filter -> gets all the records stored in the DB.
        return this.usersModel.find();
    }

    public getUsersByIds(userIds: Types.ObjectId[]): Promise<Users[]> {
        return this.usersModel.find({ _id: { $in: userIds } }).exec();
    }

    public async getUserByUserName(username: string): Promise<Users> {
        const user = await this.usersModel.findOne({ username }).exec();
        if (!user) throw new NotFoundException(`Invalid Username: Could't find user: ${username}.`);

        return user;
    }

    public async getUserById(userId: Types.ObjectId): Promise<Users> {
        const user = await this.usersModel.findById({ userId }).exec();
        if (!user) throw new NotFoundException(`Invalid UserId: Could't find user with id: ${userId}.`);

        return user;
    }

    public async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const newCompleteUser = {
            username: createUserDto.username,
            password: createUserDto.password,
            singupData: Date.now(),
        }
        const newUser = new this.usersModel(newCompleteUser);
        return await newUser.save();
    }

    public async updateUserById(userId: Types.ObjectId, updateUserDto: Partial<CreateUserDto>): Promise<Users> {
        const updatedUser = await this.usersModel.findByIdAndUpdate({ userId }, updateUserDto).exec();
        if (!updatedUser) throw new NotFoundException(`UPDATE USER FAILD: Invalid userId. Could't find user ID: '${userId}'.`);

        return updatedUser;
    }

    public async removeUserById(userId: Types.ObjectId): Promise<Users> {
        const deletedUser = await this.usersModel.findByIdAndDelete({ userId }).exec();
        if (!deletedUser) throw new NotFoundException(`DELETE USER FAILD: Invalid userId. Could't find user ID: '${userId}'.`);

        await this.usersModel.updateMany(
            { contacts: userId }, // To get all users with this username in contacts.
            { $pull: { contacts: userId } } // $pull deletes the username from contacts.
        );

        // need to add deletion from groups and dms as well.

        return deletedUser;
    }

    public async addContactsToUser(userId: Types.ObjectId, userContactsdDto: ContactsDto) {
        const contactIdsToAdd = await this.getValidContacts(userContactsdDto);

        return this.usersModel.findByIdAndUpdate({ userId }, { contacts: contactIdsToAdd }).exec();
    }

    async removeContactsFromUser(userId: Types.ObjectId, userContactsdDto: ContactsDto): Promise<Users> {
        const contactIdsToRemove = await this.getValidContacts(userContactsdDto);

        const updatedUser = await this.usersModel.findByIdAndUpdate(
            { userId },
            { $pullAll: { contacts: contactIdsToRemove } },
            { new: true }
        ).exec();
        if (!updatedUser) {
            throw new NotFoundException(`Faild: User with username '${userId}' not found.`);
        }

        return updatedUser;
    }

    private async getValidContacts(userContactsdDto: ContactsDto): Promise<Types.ObjectId[]> {
        const usernames = userContactsdDto.contacts;

        const { contactIds, contactNames } = await this.mapingContactDto(usernames);

        const foundUsernames = new Set(contactNames); // set -> unique 
        const notFound = usernames.filter(name => !foundUsernames.has(name));
        if (notFound.length) {
            throw new NotFoundException(`Faild: Users not found: ${notFound.join(', ')}`);
        }

        return contactIds;
    }

    private async mapingContactDto(usernames: string[]): Promise<{ contactIds: Types.ObjectId[], contactNames: string[] }> {
        // Geting the id for each username 
        const contacts = await this.usersModel.find({
            username: { $in: usernames },
        }, '_id username').exec();

        // Making an array for contactIds and contactNames.
        const contactIds = contacts.map((user) => user._id as Types.ObjectId);
        const contactNames = contacts.map((user) => user.username as string);

        return { contactIds, contactNames };
    }
}
