import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma.service';

@Module({  imports: [],
  controllers: [ChatController],
  providers: [{
    provide: ChatService,
    useClass: ChatService
  },
    {
      provide: PrismaService,
      useClass: PrismaService
    },
  ],
})
export class ChatModule {}
