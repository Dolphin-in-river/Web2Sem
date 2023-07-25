import {
  Get,
  Delete,
  Param,
  Controller,
  Body,
  Put, UseFilters
} from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductInWarehouseDto } from './dto/productInWarehouse.dto';
import { ProductService } from './product.service';
import { ProductForCustomerDto } from "./dto/productForCustomer.dto";
import { HttpExceptionFilter } from "../http-exception.filter";

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get Product by id',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    type: ProductForCustomerDto,
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
  async showProduct(@Param('id') id: string) {
    return await this.productService.showProduct(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get All Products',
  })
  @ApiResponse({
    status: 200,
    type: [ProductForCustomerDto],
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
  @Get()
  async showAllProduct() {
    return await this.productService.showAllProduct();
  }

  @ApiOperation({
    summary: 'Get Product by name',
  })
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({
    status: 200,
    type: ProductForCustomerDto,
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
  @Get(':name')
  async showProductByName(@Param('name') name: string) {
    return await this.productService.showProductByName(name);
  }

  @ApiOperation({
    summary: 'Update amount of Product',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.'
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
  @Put(':id')
  async updateAmountProduct(
    @Param('id') id: string,
    @Body() productInWarehouseDto: ProductInWarehouseDto,
  ) {
    return await this.productService.updateProduct(parseInt(id), productInWarehouseDto);
  }

  @ApiOperation({
    summary: 'Delete Product',
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
  async deleteProfile(@Param('id') id: string) {
    return await this.productService.deleteProduct(parseInt(id));
  }
}
