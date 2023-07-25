import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerTimeInterceptor } from './server-time-interceptor.service';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ChatModule } from './chat/chat.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from "./message/message.module";
import { HttpExceptionFilter } from "./http-exception.filter";
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: "https://try.supertokens.com",
      appInfo: {
          appName: "dolphin-in-river",
        apiDomain: "https://dolphin-in-river.onrender.com",
        websiteDomain: "https://dolphin-in-river.onrender.com",
        apiBasePath: "/api",
        websiteBasePath: "/index",
      },
    }),
    ChatModule,
    MessageModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    ProfileModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerTimeInterceptor,
    },
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
