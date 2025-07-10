import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Groups, groupsSchema } from 'src/schemas/groups/groups.schema';
import { GroupService } from './services/group/group.service';
import { GroupController } from './controllers/group/group.controller';
import { UsersService } from 'src/components/users/services/user/user.service';
import { UsersModule } from 'src/components/users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Groups.name,
            schema: groupsSchema,
        }]),
        UsersModule,
    ],
    providers: [GroupService, UsersService],
    controllers: [GroupController]
})
export class GroupsModule { }
