import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Get, Param, ParseIntPipe, UseFilters } from "@nestjs/common";
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { HttpExceptionFilter } from "../http-exception.filter";

@ApiTags('order')
@Controller('order')
@UseFilters(new HttpExceptionFilter())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Show order',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    type: OrderDto,
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
  async showOrder(@Param('id', ParseIntPipe) chatId: number) {
    return await this.orderService.showOrder(chatId);
  }

  @ApiOperation({
    summary: 'Close order',
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
  async deleteOrder(@Param('id', ParseIntPipe) chatId: number) {
    return await this.orderService.closeOrder(chatId);
  }
}
