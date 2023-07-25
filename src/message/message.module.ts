import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { PrismaService } from "../prisma.service";

@Module({  imports: [],
  controllers: [MessageController],
  providers: [{
    provide: MessageService,
    useClass: MessageService
  },
    {
      provide: PrismaService,
      useClass: PrismaService
    },
  ],
})
export class MessageModule {}
