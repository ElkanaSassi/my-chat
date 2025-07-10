import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Groups, groupsSchema } from 'src/schemas/groups/groups.schema';
import { GroupService } from './services/group/group.service';
import { GroupController } from './controllers/group/group.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
                name: Groups.name,
                schema: groupsSchema,
            }])
    ],
    providers: [GroupService],
    controllers: [GroupController]
})
export class GroupsModule { }
