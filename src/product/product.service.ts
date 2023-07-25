import { Injectable } from '@nestjs/common';
import {  ProductInWarehouse } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { ProductInWarehouseDto } from "./dto/productInWarehouse.dto";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async showProduct(id: number): Promise<ProductInWarehouse> {
    return await this.prisma.productInWarehouse.findUniqueOrThrow({
      where: {
        id: id
      }
    })
  }
  async showAllProduct(): Promise<ProductInWarehouse[]> {
    return await this.prisma.productInWarehouse.findMany()
  }
  async showProductByName(name: string): Promise<ProductInWarehouse[]> {
    return await this.prisma.productInWarehouse.findMany({
      where: {
        name: name
      }
    })
  }
  async deleteProduct(id: number) {
    return await this.prisma.productInWarehouse.delete({
      where: {
        id: id
      }
    })
  }
  async updateProduct(
    id: number,
    productDto: ProductInWarehouseDto,
  ) {
    return await this.prisma.productInWarehouse.update({
      where: {
        id: id
      },
      data: {
        name: productDto.name,
        description: productDto.description,
        linkToPhoto: productDto.linkToPhoto,
        price: productDto.price,
        amountInWarehouse: productDto.amount,
      }
    })
  }
}
