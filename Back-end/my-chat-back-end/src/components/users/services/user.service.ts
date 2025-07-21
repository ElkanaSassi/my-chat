import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users } from 'src/schemas/users/users.schema';
import { CreateUserDto } from '../../../dto/users/create-user.dto';
import { AddContactsDto } from '../../../dto/users/add-contacts.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<Users>
    ) {

    }

    public async getAllUsers(): Promise<string[]> {
        // Find all with no filter -> gets all the records stored in the DB.
        const users: Users[] = await this.usersModel.find().exec();
        const usersArray: string[] = users.map(u => u.username);

        return usersArray;
    }

    public getUsersByIds(userIds: Types.ObjectId[]): Promise<Users[]> {
        return this.usersModel.find({ _id: { $in: userIds } }).exec();
    }

    public async getUserByUserName(username: string): Promise<Users> {
        const user = await this.usersModel.findOne({ username })
            .populate('contacts', 'username')
            .exec();
        if (!user) throw new NotFoundException(`Invalid Username: Could't find user: ${username}.`);

        return user;
    }

    public async getUserById(userId: Types.ObjectId): Promise<Users> {
        let user = await this.usersModel.findById({ _id: userId })
            .populate('contacts', 'username')
            .exec();
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

    public async addContactToUser(username: string, addContactdDto: AddContactsDto): Promise<string[]> {
        const contact = await this.usersModel.findOne({ username: addContactdDto.contact }).exec();

        const updatedUser = await this.usersModel.findOneAndUpdate(
            { username: username },
            { $addToSet: { contacts: contact } },
            { new: true }
        ).exec();
        if (!updatedUser) {
            throw new NotFoundException(`Faild: Couldn't find user: '${username}'.`);
        }

        const contacts = await this.usersModel.find(
            { _id: { $in: updatedUser.contacts } }
        ).exec();
        const updatedContacts = contacts.map(c => c.username);

        return updatedContacts;
    }

    async removeContactFromUser(userId: Types.ObjectId, removeContactsdDto: AddContactsDto): Promise<string[]> {
        const contact = await this.usersModel.findOne({ username: removeContactsdDto.contact }).exec();

        const updatedUser = await this.usersModel.findByIdAndUpdate(
            { _id: userId },
            { $pullAll: { contacts: contact } },
            { new: true }
        ).exec();
        if (!updatedUser) {
            throw new NotFoundException(`Faild: User with username '${userId}' not found.`);
        }
        const contacts = await this.usersModel.find(
            { _id: { $in: updatedUser.contacts } }
        ).exec();
        const updatedContacts = contacts.map(c => c.username);

        return updatedContacts;
    }

    // private async getValidContacts(userContactsdDto: ContactsDto): Promise<Types.ObjectId[]> {

    //     const foundUsers = await this.usersModel.find(
    //         { username: { $in: userContactsdDto.contacts } }
    //     ).exec();

    //     const validIds: Types.ObjectId[] = foundUsers.map(user => user._id as Types.ObjectId);

    //     return validIds;
    // }
}
