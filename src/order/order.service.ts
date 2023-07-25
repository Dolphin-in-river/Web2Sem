import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Order } from "@prisma/client";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {
  }

  async showOrder(id: number): Promise<Order> {
    return await this.prisma.order.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }
  async closeOrder(id: number) {
    return await this.prisma.order.delete({
      where: {
        id: id
      }
    });
  }

}
