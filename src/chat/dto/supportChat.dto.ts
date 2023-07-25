import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from "class-validator";
export class SupportChatDto {
  constructor(id: number, customerId: number, personId: number) {
    this.id = id;
    this.customerId = customerId;
    this.personId = personId;
  }

  @ApiProperty()
  @IsNotEmpty()
  id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  personId?: number;
}
