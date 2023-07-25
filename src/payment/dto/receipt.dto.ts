import { ApiProperty } from "@nestjs/swagger";
import { ProductForCustomer } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReceiptDto {
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
  @IsNumber()
  totalPrice: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dateTime: string;
  @ApiProperty()
  @IsNotEmpty()
  products: ProductForCustomer[];
}
