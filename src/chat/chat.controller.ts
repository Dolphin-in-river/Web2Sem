import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, UseFilters } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MessageDto } from "../message/dto/message.dto";
import { SupportChatDto } from "./dto/supportChat.dto";
import { HttpExceptionFilter } from "../http-exception.filter";

@ApiTags('chat')
@Controller('chat')
@UseFilters(new HttpExceptionFilter())
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @ApiOperation({
    summary: 'Get chat',
  })
  @ApiResponse({
    status: 200,
    type: SupportChatDto,
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
  async showChat(@Param('id', ParseIntPipe) id: number) {
    const result = await this.chatService.showChat(id);
    console.log(result);
    return result;
  }

  @ApiOperation({
    summary: 'Get messages',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 400,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Get(':id/show-all-messages')
  async showAllMessages(@Param('id', ParseIntPipe) chatId: number) {
    return await this.chatService.showAllMessage(chatId);
  }

  @ApiOperation({
    summary: 'Send message',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
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
  @Post(':id')
  async createMessage(@Param('id', ParseIntPipe) profileId: number, @Body() messageDto: MessageDto) {
    return await this.chatService.createMessage(profileId, messageDto);
  }

  @ApiOperation({
    summary: 'Delete chat',
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
  async deleteChat(@Param('id', ParseIntPipe) chatId: number) {
    return await this.chatService.deleteChat(chatId);
  }
}