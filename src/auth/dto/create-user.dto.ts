import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
  @IsEmail()
  userEmail: string;
  @IsString()
  @MinLength(8)
  userPassword: string;
  @IsOptional()
  @IsIn(["Admin", "Manager", "Employee"])
  userRoles: string[];
}
