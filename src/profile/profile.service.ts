import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PersonDto } from './dto/person.dto';
import { ProductForCustomerDto } from '../product/dto/productForCustomer.dto';
import { ProductInWarehouseDto } from "../product/dto/productInWarehouse.dto";
import { OrderDto } from "../order/dto/order.dto";
import { PrismaService } from "../prisma.service"
import { Prisma, Customer, Person, SupportChat, Supplier, Role, ProductForCustomer, Order, Payment, OrderStatus } from '@prisma/client';
import { LoginDto } from "./dto/login.dto";
import { AppGateway } from "../gateway/app.gateway";

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService, private readonly gateway: AppGateway,) {}

  async getProfile(data: Prisma.PersonWhereUniqueInput): Promise<Person> {
    const profile = await this.prisma.person.findUniqueOrThrow({
      where: data
    })
    if (profile == null) {
      throw new BadRequestException();
    }
    return profile;
  }
  async getProfileByEmail(email: string) {
    const person = await this.prisma.person.findUniqueOrThrow({
      where: {
        email: email,
      }
    });
    return person;
  }

  async showAllChats(id: number): Promise<SupportChat[]> {
    return await this.prisma.supportChat.findMany({
      where: {
        personId: id
      }
    })
  }
  async showAllProfiles(): Promise<Person[]> {
    return await this.prisma.person.findMany({})
  }

  async loginProfile(loginDto: LoginDto): Promise<Person> {
    const person = await this.prisma.person.findUniqueOrThrow({
      where: {
        email: loginDto.login,
      }
    })
    if (person.password == loginDto.password) {
      return person;
    }
    else {
      throw new UnauthorizedException("The user with this login and password don't exist");
    }
  }

  async createCustomerProfile(
    personDto: PersonDto,
  ): Promise<Customer> {
    const newPerson = await this.prisma.person.create({
      data: {
        name: personDto.name,
        surname: personDto.surname,
        patronymic: personDto.patronymic,
        phone: personDto.phone,
        email: personDto.email,
        login: personDto.email,
        password: personDto.password,
        role: Role.Customer,
      }
    })
    const customer = await this.prisma.customer.create({
      data: {
        id: newPerson.id,
        personId: newPerson.id,
      }
    })
    return customer;
  }
  async createSupplierProfile(
    personDto: PersonDto,
  ): Promise<Supplier> {
    const newPerson = await this.prisma.person.create({
      data: {
        name: personDto.name,
        surname: personDto.surname,
        patronymic: personDto.patronymic,
        phone: personDto.phone,
        email: personDto.email,
        login: personDto.email,
        password: personDto.password,
        role: Role.Supplier
      }
    })
    const supplier = await this.prisma.supplier.create({
      data: {
        id: newPerson.id,
        personId: newPerson.id,
      }
    })
    return supplier;
  }
  async deleteProfile(email: string): Promise<boolean> {
    const person = await this.getProfileByEmail(email);
    console.log(person.id);
    try {
      const customer = await this.prisma.customer.delete({
        where: {
          id: person.id
        },
      })
      console.log(customer);
      const profile = await this.prisma.person.delete({
        where: {
          id: person.id
        },
      })

      return profile != null;
    }
    catch (error) {
      console.error(`Произошла ошибка при удалении объекта: ${error}`);
    }
  }
  async addProductsToBasket(
    personId: number,
    productDto: ProductForCustomerDto,
  ): Promise<void> {
    const person =  await this.getProfile({ id: Number(personId) });

    if (person.role == Role.Customer) {
      const customer = await this.prisma.customer.findFirst({
        where: {
          personId: personId
        }
      })
      const product = await this.prisma.productInWarehouse.findFirst({
        where: {
          id: productDto.productId
        }
      })
      product.amountInWarehouse -= productDto.productAmount;
      const productForCustomer = await this.prisma.productForCustomer.create({
        data: {
          productId: productDto.productId,
          amountInOrder: productDto.productAmount,
          price: product.price,
          customerId: customer.id
        }
      })
    }
    else {
        throw new NotFoundException("The customer with this id don't exist")
      }
  }
  async updateCustomerProfile(
    id: number,
    personDto: PersonDto,
  ): Promise<Customer> {

    const oldCustomer = await this.prisma.customer.findFirst({
      where: {
        id: id
      }
    })
    if (oldCustomer == null) {
      throw new BadRequestException("The customer with this id don't exist")
    }
    await this.prisma.person.delete({
      where: {
        id: Number(id)
      },
    })
    await this.prisma.customer.delete({
      where: {
        id: Number(id)
      },
    })
    const newPerson = await this.prisma.person.create({
      data: {
        id: id,
        name: personDto.name,
        surname: personDto.surname,
        patronymic: personDto.patronymic,
        phone: personDto.phone,
        email: personDto.email,
        login: personDto.email,
        password: personDto.password,
        role: Role.Customer
      }
    })
    return await this.prisma.customer.create({
      data: {
        id: newPerson.id,
        personId: newPerson.id,
      }
    })
  }
  async showAllProduct(
    id: number,
  ): Promise<ProductForCustomer[]> {
    return await this.prisma.productForCustomer.findMany({
      where: {
        customerId: id
      }
    })
  }
  async createProduct(
    id: number,
    productInWarehouseDto: ProductInWarehouseDto,
  ): Promise<void> {
    const supplier = await this.prisma.supplier.findFirst({
      where: {
        id: id
      }
    })
    if (supplier == null) {
      throw new BadRequestException("The customer with this id don't exist")
    }
    const newProduct = await this.prisma.productInWarehouse.create({
      data: {
        id: id,
        name: productInWarehouseDto.name,
        description: productInWarehouseDto.description,
        linkToPhoto: productInWarehouseDto.linkToPhoto,
        price: productInWarehouseDto.price,
        amountInWarehouse: productInWarehouseDto.amount,
        supplierId: id,
      }
    })
  }
  async createChat(
    id: number
  ): Promise<SupportChat> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: id
      }
    })
    if (customer == null) {
      throw new BadRequestException("The customer with this id don't exist")
    }
    const chat = await this.prisma.supportChat.create({
      data: {
        customerId: customer.id,
        personId: id,
      }
    })
    return chat;
  }

  async getCustomerIdByEmail(email: string) {
    return await this.prisma.person.findUniqueOrThrow({
      where: {
        email: email
      }
    })
  }

  async showAllOrder(
    email: string,
  ): Promise<Order[]> {
    const person = await this.getCustomerIdByEmail(email)
    return await this.prisma.order.findMany({
      where: {
        customerId: person.id
      }
    })
  }
  async createOrder(
    email: string,
    orderDto: OrderDto,
  ): Promise<Order> {
    const timeNow: Date = new Date();
    console.log(timeNow);
    const person = await this.getProfileByEmail(email);
    const newOrder = await this.prisma.order.create({
      data: {
        customerId: person.id,
        totalPrice: orderDto.totalPrice,
        dateTime: timeNow.toString(),
        orderStatus: OrderStatus.InProcessing,
      }
    })

    await this.prisma.deliveryInformation.create({
      data: {
        address: orderDto.address,
        dateTime: timeNow.toString(),
        orderId: newOrder.id
      }
    })

    this.gateway.server.emit('newOrder', newOrder);
    return newOrder;
  }
  async doPayment(data: Prisma.PaymentUncheckedCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data
    })
  }
}