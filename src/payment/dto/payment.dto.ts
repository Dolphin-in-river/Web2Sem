import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isConfirm: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dateTime: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  paymentMethod: number;
}
