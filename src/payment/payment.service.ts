import { Injectable } from "@nestjs/common";
import { ReceiptDto } from "./dto/receipt.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {
  }
  async closePayment(id: number) {
    return await this.prisma.payment.delete({
      where: {
        id: id
      }
    });
  }

  async getReceipt(id: number): Promise<ReceiptDto> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: id
      }
    });
    const receipt = new ReceiptDto();
    receipt.dateTime = payment.dateTime;
    receipt.orderId = payment.orderId;
    receipt.totalPrice = payment.totalPrice;
    receipt.products = await this.prisma.productForCustomer.findMany({
      where: {
        id: payment.orderId
      }
    });
    return receipt;
  }
}
