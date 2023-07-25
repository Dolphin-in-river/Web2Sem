import { Injectable} from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from "../prisma.service";
import { Message } from "@prisma/client";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async showMessage(id: number): Promise<Message> {
    return await this.prisma.message.findUniqueOrThrow({
      where: {
        id: id
      }
    })
  }
  async changeMessage(id: number, messageDto: MessageDto): Promise<Message> {
    return await this.prisma.message.update({
      where: {
        id: id
      },
      data: {
        text: messageDto.text,
        dateTime: messageDto.dateTime
      }
    })
  }
  async deleteMessage(id: number) {
    return await this.prisma.message.delete({
      where: {
        id: id
      }
    })
  }
}
