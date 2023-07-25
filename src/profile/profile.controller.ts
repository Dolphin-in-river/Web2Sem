import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  Put, UseGuards
} from "@nestjs/common";
import { ProfileService } from './profile.service';

import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PersonDto } from './dto/person.dto';
import { ProductForCustomerDto } from '../product/dto/productForCustomer.dto';
import { ProductInWarehouseDto } from "../product/dto/productInWarehouse.dto";
import { OrderDto } from "../order/dto/order.dto";
import { PaymentDto } from "../payment/dto/payment.dto";
import { Customer, Person } from "@prisma/client";
import { SupportChatDto } from "../chat/dto/supportChat.dto";
import { MessageDto } from "../message/dto/message.dto";
import { LoginDto } from "./dto/login.dto";
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AuthGuard } from "../auth/auth.guard";
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from "../auth/session.decorator";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import {deleteUser} from "supertokens-node";

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Get profile by id',
  })
  @ApiResponse({
    status: 200,
    type: PersonDto,
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 400,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Get(':id')
  async showProfile(@Param('id') id: string): Promise<PersonDto> {
    return await this.profileService.getProfile({ id: Number(id) });
  }

  @ApiOperation({
    summary: 'Login to account by email and password',
  })
  @ApiResponse({
    status: 200,
    type: PersonDto,
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 400,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Post('login')
  async loginProfile(@Session() session: SessionContainer, @Body() loginDto: LoginDto): Promise<PersonDto> {
    return await this.profileService.loginProfile(loginDto);
  }

  @ApiOperation({
    summary: 'Get all profiles',
  })
  @ApiResponse({
    status: 200,
    type: [PersonDto],
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
  @Get(':id/all-profiles')
  async showAllProfiles(): Promise<PersonDto[]> {
    return await this.profileService.showAllProfiles();
  }

  @ApiOperation({
    summary: 'Registration new customer',
  })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.'
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
  @Post('create-customer')
  async createCustomer(@Body() personDto: PersonDto): Promise<Customer> {
    return await this.profileService.createCustomerProfile(personDto);
  }

  @ApiOperation({
    summary: 'Registration new supplier',
  })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.'
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
  @Post('create-supplier')
  async createSupplier(@Body() personDto: PersonDto): Promise<Customer> {
    return await this.profileService.createSupplierProfile(personDto);
  }

  @ApiOperation({
    summary: 'Delete profile',
  })
  @ApiParam({ name: 'email', type: 'string' })
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
  @Delete(':email')
  async deleteProfile(@Param('email') email: string) {
    return await this.profileService.deleteProfile(email);
  }

  @ApiOperation({
    summary: 'Update information at profile',
  })
  @ApiResponse({
    status: 201,
    description: 'The profile has been updated successfully.'
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
  async updateProfile(@Param('id') id: string, @Body() personDto: PersonDto) {
    return await this.profileService.updateCustomerProfile(parseInt(id), personDto);
  }

  @ApiOperation({
    summary: 'Add product to basket at profile',
  })
  @ApiResponse({
    status: 201,
    description: 'The products has been added successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 400,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Post(':id/products-to-basket')
  async addProductsToBasket(
    @Param('id') id: string,
    @Body() productDto: ProductForCustomerDto,
  ) {
    return await this.profileService.addProductsToBasket(parseInt(id), productDto);
  }

  @ApiOperation({
    summary: 'Get all chats',
  })
  @ApiResponse({
    status: 200,
    type: [SupportChatDto],
    description: 'The operation was completed successfully.'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @ApiResponse({
    status: 400,
    description: 'Not found this item.'
  })
  @ApiResponse({
    status: 501,
    description: 'Not implemented yet.'
  })
  @Get(':id/all-chats')
  async showAllChats(@Param('id') id: string): Promise<SupportChatDto[]> {
    return await this.profileService.showAllChats(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get all products',
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
  @Get(':id/all-products')
  async showAllProduct(@Param('id') id: string) {
    return await this.profileService.showAllProduct(parseInt(id));
  }

  @ApiOperation({
    summary: 'Create new product card',
  })
  @ApiResponse({
    status: 201,
    description: 'The new product card has been added successfully.'
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
  @Post(':id/product-card')
  async createProduct(
    @Param('id') id: string,
    @Body() productInWarehouseDto: ProductInWarehouseDto,
  ) {
    return await this.profileService.createProduct(parseInt(id), productInWarehouseDto);
  }

  @ApiOperation({
    summary: 'Create chat',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 201,
    description: 'The chat has been added successfully.'
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
  @Post(':id/chat')
  async createChat(@Param('id') profileId: string) {
    return await this.profileService.createChat(parseInt(profileId));
  }

  @ApiOperation({
    summary: 'Show all orders',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    type: [OrderDto],
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
  @Get(':email/all-orders')
  async showAllOrder(@Param('email') email: string) {
    return await this.profileService.showAllOrder(email);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create order',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 201,
    description: 'The order has been created successfully.'
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
  @UseGuards(new AuthGuard())
  @Post('order')
  async createOrder(@Session() session: SessionContainer, @Body() orderDto: OrderDto) {
    const userId = session.getUserId(session);
    const user = await EmailPassword.getUserById(userId);
    return await this.profileService.createOrder(user.email, orderDto);
  }

  @ApiOperation({
    summary: 'Do payment',
  })
  @ApiResponse({
    status: 201,
    description: 'The payment has been done successfully.'
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
  @Post('payment')
  async doPayment(
    @Body() paymentDto: PaymentDto,
  ) {
    return await this.profileService.doPayment(paymentDto);
  }
}
