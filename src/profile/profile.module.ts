import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { PrismaService } from "../prisma.service";
import { AppGateway } from "../gateway/app.gateway";

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, AppGateway],
})
export class ProfileModule {
}
