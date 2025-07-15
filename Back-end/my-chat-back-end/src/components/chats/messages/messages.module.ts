import { Module } from '@nestjs/common';
import { MessagesServices } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, messagesSchema } from 'src/schemas/messages/messages.schema';
import { UsersModule } from '../chats.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Messages.name,
            schema: messagesSchema,
        }]),
        UsersModule
    ],
    providers: [MessagesServices],
    controllers: [],
    exports: [MessagesServices]
})
export class MessagesModule {

}