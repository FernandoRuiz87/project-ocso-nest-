import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiCreateEmployee,
  ApiEmployeeResponse,
  ApiFindAllEmployees,
} from "src/decorators/employees.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ApiAuth, ApiUUIDParam } from "src/auth/decorators/api.decorator";
import { AwsService } from "src/aws/aws.service";

@ApiAuth()
@ApiTags("Employees")
@Controller("employees")
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService
  ) {}

  @ApiCreateEmployee()
  @Auth(ROLES.MANAGER)
  @Post()
  @UseInterceptors(FileInterceptor("employeePhoto"))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      return this.employeesService.create(createEmployeeDto);
    } else {
      const photoUrl = await this.awsService.uploadFile(file);
      createEmployeeDto.employeePhoto = photoUrl;
      return this.employeesService.create(createEmployeeDto);
    }
  }

  @ApiOperation({ summary: "Upload a photo" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({
    status: 201,
    description: "Photo uploaded successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Error uploading file",
  })
  @Post(":id/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPhoto(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const response = await this.awsService.uploadFile(file);
    return this.employeesService.update(id, {
      employeePhoto: response,
    });
  }

  @ApiFindAllEmployees()
  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @ApiEmployeeResponse()
  @ApiUUIDParam("id", "UUID of the employee to search for")
  @Get("/:id")
  findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.findOne(id);
  }

  @ApiOperation({ summary: "Get employees by location" })
  @ApiUUIDParam("id", "UUID of the location to search for")
  @ApiFindAllEmployees()
  @Auth(ROLES.MANAGER)
  @Get("/location/:id")
  findAllLocation(@Param("id") id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @ApiOperation({
    summary: "Update employee data",
  })
  @ApiUUIDParam("id", "UUID of the employee to update")
  @ApiEmployeeResponse()
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @UseInterceptors(FileInterceptor("employeePhoto"))
  @Patch("/:id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file.originalname == "undefined") {
      return this.employeesService.update(id, updateEmployeeDto);
    } else {
      const fileUrl = await this.awsService.uploadFile(file);
      updateEmployeeDto.employeePhoto = fileUrl;
      return this.employeesService.update(id, updateEmployeeDto);
    }
  }

  @ApiOperation({ summary: "Delete an employee" })
  @ApiUUIDParam("id", "UUID of the employee to delete")
  @ApiResponse({
    status: 200,
    description: "Employee deleted",
    example: {
      message: "Object with id 3127d756-65ee-4ba8-819e-62f12ce4dc20 deleted",
    },
  })
  @Auth(ROLES.MANAGER)
  @Delete("/:id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
