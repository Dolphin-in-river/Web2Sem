import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from "../prisma.service";

@Module({  imports: [],
  controllers: [OrderController],
  providers: [{
    provide: OrderService,
    useClass: OrderService
  },
    {
      provide: PrismaService,
      useClass: PrismaService
    },
  ],
})
export class OrderModule {}
