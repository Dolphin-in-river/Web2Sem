import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductForCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productAmount?: number;
}
