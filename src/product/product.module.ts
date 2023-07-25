import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from "../prisma.service";

@Module({  imports: [],
  controllers: [ProductController],
  providers: [{
    provide: ProductService,
    useClass: ProductService
  },
    {
      provide: PrismaService,
      useClass: PrismaService
    },
  ],
})
export class ProductModule {}
