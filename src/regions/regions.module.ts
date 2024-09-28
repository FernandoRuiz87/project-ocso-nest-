import { Module } from "@nestjs/common";
import { RegionsService } from "./regions.service";
import { RegionsController } from "./regions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "./entities/region.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
