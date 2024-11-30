import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import {
  ApiCreateProduct,
  ApiFindAllProducts,
  ApiProductResponse,
} from "src/decorators/products.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiAuth, ApiUUIDParam } from "src/auth/decorators/api.decorator";

@ApiAuth()
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiCreateProduct()
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiFindAllProducts()
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @ApiProductResponse()
  @ApiUUIDParam("id", "UUID of the product to search for")
  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: "Get products by provider" })
  @ApiUUIDParam("id", "UUID of the provider to search for")
  @ApiFindAllProducts()
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get("provider/:id")
  findByProvider(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.findByProvider(id);
  }

  @ApiOperation({ summary: "Update product data" })
  @ApiUUIDParam("id", "UUID of the product to update")
  @ApiProductResponse()
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: "Delete a product" })
  @ApiUUIDParam("id", "UUID of the product to delete")
  @ApiResponse({
    status: 200,
    description: "Product deleted",
    example: {
      message: "Object with id 3127d756-65ee-4ba8-819e-62f12ce4dc20 deleted",
    },
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.remove(id);
  }
}
