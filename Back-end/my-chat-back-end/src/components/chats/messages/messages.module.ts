import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesServices } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, messagesSchema } from 'src/schemas/messages/messages.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Messages.name,
            schema: messagesSchema,
        }]),
    ],
    providers: [MessagesServices],
    controllers: [MessagesController]
})
export class MessagesModule {

}