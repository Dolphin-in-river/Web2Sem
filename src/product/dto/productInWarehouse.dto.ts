import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export abstract class ProductInWarehouseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  linkToPhoto?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount?: number;
}
