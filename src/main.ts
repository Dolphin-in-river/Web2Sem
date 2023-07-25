import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { ServerTimeInterceptor } from './server-time-interceptor.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpExceptionFilter } from "./http-exception.filter";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";

async function bootstrap() {

  let app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cors = require('cors');
  app.use(cors({
    origin: "https://dolphin-in-river.onrender.com",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }));


  app.use(middleware());

  const config = new DocumentBuilder()
    .setTitle('SadFarmer')
    .setDescription('The SadFarmer API description')
    .setVersion('1.0')
    .addTag('SadFarmer shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2001: HttpStatus.UNAUTHORIZED,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );
  app.useGlobalInterceptors(new ServerTimeInterceptor());
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
