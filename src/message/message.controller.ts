import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseFilters } from "@nestjs/common";
import { MessageService } from './message.service';
import { MessageDto } from "./dto/message.dto";
import { HttpExceptionFilter } from "../http-exception.filter";

@ApiTags('message')
@Controller('message')
@UseFilters(new HttpExceptionFilter())
export class MessageController {
  constructor(private readonly chatService: MessageService) {}

  @ApiOperation({
    summary: 'Get message',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    type: MessageDto,
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
  async showMessage(@Param('id', ParseIntPipe) chatId: number) {
    return await this.chatService.showMessage(chatId);
  }

  @ApiOperation({
    summary: 'Change message',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.'
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
  @Put(':id')
  async changeMessage(@Param('id', ParseIntPipe) profileId: number, @Body() messageDto: MessageDto) {
    return await this.chatService.changeMessage(profileId, messageDto);
  }

  @ApiOperation({
    summary: 'Delete message',
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
  async deleteMessage(@Param('id', ParseIntPipe) chatId: number) {
    return await this.chatService.deleteMessage(chatId);
  }
}
