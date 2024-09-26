import {
  IsEmail,
  IsOptional,
  isString,
  IsString,
  MaxLength,
} from "class-validator";
import { Provider } from "../entities/provider.entity";

export class CreateProviderDto extends Provider {
  @IsString()
  @MaxLength(100)
  providerName: string;
  @IsEmail()
  providerEmail: string;
  @IsString()
  @MaxLength(15)
  @IsOptional()
  providerPhoneNumber: string;
}
