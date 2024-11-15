import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto extends Employee {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location: Location | string;

  @ApiPropertyOptional()
  @IsOptional()
  employeePhoto: string;
}
