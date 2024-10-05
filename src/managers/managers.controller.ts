import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ManagersService } from "./managers.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiAuth, ApiUUIDParam } from "src/auth/decorators/api.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ApiCreateManager,
  ApiFindAllManagers,
  ApiManagerResponse,
} from "src/decorators/managers.decorator";
import { ApiProviderResponse } from "src/decorators/providers.decorator";

@ApiAuth()
@ApiTags("Managers")
@Controller("managers")
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @ApiCreateManager()
  @Auth()
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @ApiFindAllManagers()
  @Auth()
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @ApiProviderResponse()
  @ApiUUIDParam("id", "ID of the manager to search for")
  @Auth()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.managersService.findOne(id);
  }

  @ApiOperation({ summary: "Update a manager data" })
  @ApiUUIDParam("id", "UUID of the manager to search for")
  @ApiManagerResponse()
  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @ApiOperation({ summary: "Delete a manager" })
  @ApiUUIDParam("id", "UUID of the manager to delete")
  @ApiResponse({
    status: 200,
    description: "Manager deleted",
    example: {
      message: "Object with id 3127d756-65ee-4ba8-819e-62f12ce4dc20 deleted",
    },
  })
  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.managersService.remove(id);
  }
}
