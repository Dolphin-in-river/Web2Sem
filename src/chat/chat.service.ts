import { Injectable } from "@nestjs/common";
import { SupportChatDto } from './dto/supportChat.dto';
import { MessageDto } from "../message/dto/message.dto";
import { Message } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { NotFoundError } from "rxjs";


@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async showChat(id: number): Promise<SupportChatDto> {
    return  await this.prisma.supportChat.findUniqueOrThrow({
      where: {
        id: id
      }
    })
  }


  async createMessage(chatId: number, messageDto: MessageDto): Promise<Message> {
    return  await this.prisma.message.create({
      data: {
        text: messageDto.text,
        dateTime: messageDto.dateTime,
        supportChatId: chatId
      }
    })
  }
  async showAllMessage(profileId: number): Promise<Message[]> {
    throw new NotFoundError("");
    return await this.prisma.message.findMany({
      where: {
        supportChatId: profileId
      }
    })
  }
  async deleteChat(chatId: number){
    return await this.prisma.supportChat.delete({
      where: {
        id: chatId
      }
    })
  }
}
