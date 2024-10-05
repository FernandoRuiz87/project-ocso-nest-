import { ApiResponse, ApiOperation } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { Provider } from "src/providers/entities/provider.entity";

// Decorator for creating a new provider
export function ApiCreateProvider() {
  return applyDecorators(
    ApiOperation({ summary: "Create a new provider" }),
    ApiResponse({
      status: 200,
      description: "Provider created successfully",
      example: {
        providerId: "UUID",
        providerName: "Coca-cola",
        providerEmail: "Coca-cola@example.com",
        providerPhoneNumber: "123456789",
      } as Provider,
    })
  );
}

// Decorator for getting all providers
export function ApiFindAllProviders() {
  return applyDecorators(
    ApiOperation({ summary: "Get all providers" }),
    ApiResponse({
      status: 200,
      description: "List of providers obtained successfully",
      example: [
        {
          providerId: "UUID1",
          providerName: "Coca-cola",
          providerEmail: "Coca-cola@example.com",
          providerPhoneNumber: "123456789",
        },
        {
          providerId: "UUID2",
          providerName: "Pecsi",
          providerEmail: "Pecsi@example.com",
          providerPhoneNumber: "123456789",
        },
      ] as Provider[],
    }),
    ApiResponse({
      status: 404,
      description: "Providers not found",
    })
  );
}

// Decorator for getting a provider by ID
export function ApiProviderResponse() {
  return applyDecorators(
    ApiOperation({ summary: "Get a provider by ID" }),
    ApiResponse({
      status: 200,
      description: "Provider obtained successfully",
      example: {
        providerId: "UUID",
        providerName: "Coca-cola",
        providerEmail: "Coca-cola@example.com",
        providerPhoneNumber: "123456789",
      } as Provider,
    }),
    ApiResponse({
      status: 404,
      description: "Provider not found",
    })
  );
}
