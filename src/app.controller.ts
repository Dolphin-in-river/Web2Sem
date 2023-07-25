import {
  Controller,
  Get,
  NotImplementedException,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ServerTimeInterceptor } from './server-time-interceptor.service';

@UseInterceptors(ServerTimeInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  mainPage(): void {
    return;
  }

  @Get('index')
  @Render('index.hbs')
  getIndex(): void {
    return;
  }

  @Get('aboutCompany')
  @Render('aboutCompany.hbs')
  getAboutCompany(): void {
    return;
  }

  @Get('input')
  @Render('input.hbs')
  getInput(): void {
    return;
  }

  @Get('contacts')
  @Render('contacts.hbs')
  getContacts(): void {
    return;
  }

  @Get('feedbacks')
  @Render('feedbacks.hbs')
  getFeedbacks(): void {
    return;
  }

  @Get('deliveryAndPayment')
  @Render('deliveryAndPayment.hbs')
  getDeliveryAndPayment(): void {
    return;
  }

  @Get('cart')
  @Render('cart.hbs')
  getCart(): void {
    return;
  }

  @Get('register')
  @Render('register.hbs')
  getRegister(): void {
    return;
  }

  getHello() {
    throw new NotImplementedException();
  }
}
