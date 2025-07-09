import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserFriendDto } from 'src/users/DTO/create-user-friend.dto';
import { UserFriendService } from 'src/users/services/user-friend/user-friend.service';

@Controller('user-friend')
export class UserFriendController {
    constructor(private userFriendService: UserFriendService) { }

    @Patch('addFriend')
    @UsePipes(new ValidationPipe())
    addNewFriend(@Body() CreateUserFriendDto: CreateUserFriendDto) {
        const isValid = mongoose.Types.ObjectId.isValid(CreateUserFriendDto.username);
        if (!isValid) throw new HttpException('Invalid Id: Can\'t add friend, username not found!', HttpStatus.BAD_REQUEST);

        return this.userFriendService.addNewFriendByUserName(CreateUserFriendDto);
    }

    @Delete('removeFriend')
    removeFriendByUserName(@Body() UserFriendDto: CreateUserFriendDto) {
        const isValidUserName = mongoose.Types.ObjectId.isValid(UserFriendDto.username);
        if (!isValidUserName) {
            throw new HttpException('Invalid Id: Can\'t remove friend, Username not found!', HttpStatus.BAD_REQUEST);
        }

        const isValidFriendUsername = mongoose.Types.ObjectId.isValid(UserFriendDto.friendUsername);
        if (!isValidFriendUsername) {
            throw new HttpException('Invalid Id: Can\'t remove friend, Username not found!', HttpStatus.BAD_REQUEST);
        }

        return this.userFriendService.removeFriendByUserName(UserFriendDto);
    }
}
