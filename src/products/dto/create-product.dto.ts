import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto extends Product {
  @ApiProperty()
  @IsString()
  @IsUUID("4")
  @IsOptional()
  productId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  productName: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  countSeal: number;

  @ApiProperty()
  @IsObject()
  provider: Provider;
}
