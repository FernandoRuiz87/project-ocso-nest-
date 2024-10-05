import { Product } from "src/products/entities/product.entity";
import { ApiResponse, ApiOperation } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";

// Decorator for creating a new product
export function ApiCreateProduct() {
  return applyDecorators(
    ApiOperation({ summary: "Create a new product" }),
    ApiResponse({
      status: 201,
      description: "Product created successfully",
      example: {
        productId: "UUID",
        productName: "Coca-cola",
        price: 20,
        countSeal: 2,
        provider: {
          providerName: "Coca-cola",
          providerEmail: "Coca-cola@example.com",
          providerPhoneNumber: "123456789",
        },
      } as Product,
    })
  );
}

// Decorator for getting all products
export function ApiFindAllProducts() {
  return applyDecorators(
    ApiOperation({ summary: "Get all products" }),
    ApiResponse({
      status: 200,
      description: "List of products obtained successfully",
      example: [
        {
          productId: "UUID1",
          productName: "Coca-cola",
          price: 20,
          countSeal: 2,
          provider: {
            providerName: "Coca-cola",
            providerEmail: "Coca-cola@example.com",
            providerPhoneNumber: "123456789",
          },
        },
        {
          productId: "UUID2",
          productName: "Pecsi",
          price: 20,
          countSeal: 2,
          provider: {
            providerName: "Pecsi",
            providerEmail: "Pecsi@example.com",
            providerPhoneNumber: "123456789",
          },
        },
      ] as Product[],
    }),
    ApiResponse({
      status: 404,
      description: "Products not found",
    })
  );
}

// Decorator for getting a product by ID
export function ApiProductResponse() {
  return applyDecorators(
    ApiOperation({ summary: "Get a product by ID" }),
    ApiResponse({
      status: 200,
      description: "Product obtained successfully",
      example: {
        productId: "UUID",
        productName: "Coca-cola",
        price: 20,
        countSeal: 2,
        provider: {
          providerName: "Coca-cola",
          providerEmail: "Coca-cola@example.com",
          providerPhoneNumber: "123456789",
        },
      } as Product,
    }),
    ApiResponse({
      status: 404,
      description: "Product not found",
    })
  );
}
