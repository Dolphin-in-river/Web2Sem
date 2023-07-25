import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dateTime: string;
}
