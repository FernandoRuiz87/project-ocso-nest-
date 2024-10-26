import { Module } from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { ManagersController } from "./managers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Manager } from "./entities/manager.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersModule],
})
export class ManagersModule {}
