import { Module } from '@nestjs/common';
import { DmsController } from './controllers/dms.controller';
import { DmsService } from './services/dms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dms, dmsSchema } from 'src/schemas/dms/dms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Dms.name,
            schema: dmsSchema,
        }]),
    ],
    providers: [DmsService],
    controllers: [DmsController]
})
export class DmsModule {

}