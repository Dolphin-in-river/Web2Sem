import { ProductForCustomerDto } from '../../product/dto/productForCustomer.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
  @ApiProperty({type: [ProductForCustomerDto]})
  @IsNotEmpty()
  products: ProductForCustomerDto[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // payment: PaymentDto;
}
