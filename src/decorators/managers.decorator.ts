import { ApiResponse, ApiOperation } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { Provider } from "src/providers/entities/provider.entity";
import { Manager } from "src/managers/entities/manager.entity";

// Decorator for creating a new Manager
export function ApiCreateManager() {
  return applyDecorators(
    ApiOperation({ summary: "Create a new manager" }),
    ApiResponse({
      status: 200,
      description: "Manager created successfully",
      example: {
        managerId: "UUID",
        managerFullName: "Fernando Ruiz",
        managerEmail: "fernandoR@example.com",
        managerSalary: 100,
        managerPhoneNumber: "123456789",
        location: {
          locationName: "Ocso Juriquilla",
          locationAddress: "Avenida X s/n, 76230",
          locationLatLng: [12, 12],
        },
      } as Manager,
    })
  );
}

// Decorator for getting all Managers
export function ApiFindAllManagers() {
  return applyDecorators(
    ApiOperation({ summary: "Get all Managers" }),
    ApiResponse({
      status: 200,
      description: "List of providers obtained successfully",
      example: [
        {
          managerId: "UUID1",
          managerFullName: "Fernando Ruiz",
          managerEmail: "fernandoR@example.com",
          managerSalary: 100,
          managerPhoneNumber: "123456789",
          location: {
            locationName: "Ocso Juriquilla",
            locationAddress: "Avenida X s/n, 76230",
            locationLatLng: [12, 12],
          },
        },
        {
          managerId: "UUID2",
          managerFullName: "Juan Pérez",
          managerEmail: "JuanP@example.com",
          managerSalary: 100,
          managerPhoneNumber: "123456789",
          location: {
            locationName: "Ocso Centro",
            locationAddress: "Avenida Y s/n, 76235",
            locationLatLng: [12, 12],
          },
        },
      ] as Manager[],
    }),
    ApiResponse({
      status: 404,
      description: "Managers not found",
    })
  );
}

// Decorator for getting a Manager by ID
export function ApiManagerResponse() {
  return applyDecorators(
    ApiOperation({ summary: "Get a manager by ID" }),
    ApiResponse({
      status: 200,
      description: "Manager obtained successfully",
      example: {
        managerId: "UUID1",
        managerFullName: "Fernando Ruiz",
        managerEmail: "fernandoR@example.com",
        managerSalary: 100,
        managerPhoneNumber: "123456789",
        location: {
          locationName: "Ocso Juriquilla",
          locationAddress: "Avenida X s/n, 76230",
          locationLatLng: [12, 12],
        },
      } as Manager,
    }),
    ApiResponse({
      status: 404,
      description: "Manager not found",
    })
  );
}
