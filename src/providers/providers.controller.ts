import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { UserData } from "src/auth/decorators/user.decorator";
import { User } from "src/auth/entities/user.entity";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiAuth, ApiUUIDParam } from "src/auth/decorators/api.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ApiCreateProvider,
  ApiFindAllProviders,
  ApiProviderResponse,
} from "src/decorators/providers.decorator";

@ApiAuth()
@ApiTags("Providers")
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiCreateProvider()
  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @ApiFindAllProviders()
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiOperation({ summary: "Get a provider by name" })
  @ApiUUIDParam("name", "Name of the provider to search for")
  @ApiProviderResponse()
  @Get("/name/:name")
  findByName(@Param("name") name: string) {
    return this.providersService.findByName(name);
  }

  @ApiProviderResponse()
  @ApiUUIDParam("name", "ID of the provider to search for")
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id") id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException();
    return provider;
  }

  @ApiOperation({ summary: "Update a provider data" })
  @ApiUUIDParam("id", "UUID of the provider to update")
  @ApiProviderResponse()
  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @ApiOperation({ summary: "Delete a provider" })
  @ApiUUIDParam("id", "UUID of the provider to delete")
  @ApiResponse({
    status: 200,
    description: "Provider deleted",
    example: {
      message: "Object with id 3127d756-65ee-4ba8-819e-62f12ce4dc20 deleted",
    },
  })
  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
