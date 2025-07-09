import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userFriend } from 'src/schemas/userFriend.schema';
import { CreateUserFriendDto } from 'src/users/DTO/create-user-friend.dto';

@Injectable()
export class UserFriendService {
    constructor(@InjectModel(userFriend.name) private userFriendModel: Model<userFriend>) { }

    addNewFriendByUserName(userFriendDto: CreateUserFriendDto) {
        const newUserFriend = new this.userFriendModel(userFriendDto);
        return newUserFriend.save();
        // throw new HttpException('Faild: doesn\'t have conncation yet to the userFriend Shcema', HttpStatus.BAD_REQUEST);
    }

    removeFriendByUserName(userFriendDto: CreateUserFriendDto) {
        return this.userFriendModel.deleteOne(
            (user) => user.username === userFriendDto.username
                && user.friendUsername === userFriendDto.friendUsername
        );

    }
}
