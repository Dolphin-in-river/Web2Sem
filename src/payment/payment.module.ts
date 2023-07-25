import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from "../prisma.service";

@Module({  imports: [],
  controllers: [PaymentController],
  providers: [{
    provide: PaymentService,
    useClass: PaymentService
  },
    {
      provide: PrismaService,
      useClass: PrismaService
    },
  ],
})
export class PaymentModule {}
