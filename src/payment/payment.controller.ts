import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Get, Param, UseFilters } from "@nestjs/common";
import { PaymentService } from './payment.service';
import { ReceiptDto } from "./dto/receipt.dto";
import { HttpExceptionFilter } from "../http-exception.filter";

@ApiTags('payment')
@Controller('payment')
@UseFilters(new HttpExceptionFilter())
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Get receipt by payment',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    type: ReceiptDto,
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Get(':id')
  async getReceipt(@Param('id') chatId: string) {
    return await this.paymentService.getReceipt(parseInt(chatId));
  }

  @ApiOperation({
    summary: 'Close payment',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 404,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Delete(':id')
  async closePayment(@Param('id') chatId: string) {
    return await this.paymentService.closePayment(parseInt(chatId));
  }
}
