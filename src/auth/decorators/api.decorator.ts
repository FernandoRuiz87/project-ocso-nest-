import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiParam } from "@nestjs/swagger";

export const ApiAuth = () => {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: "Missing or invalid token",
    }),
    ApiResponse({
      status: 403,
      description: "Missing role",
    }),
    ApiResponse({
      status: 500,
      description: "Internal server error",
    })
  );
};

// Decorator for UUID parameters
export function ApiUUIDParam(name: string, description: string) {
  return ApiParam({
    name,
    description,
    type: "string",
  });
}
