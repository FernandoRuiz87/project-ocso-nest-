import { Employee } from "src/employees/entities/employee.entity";
import { ApiResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";

// Decorator for creating a new employee
export function ApiCreateEmployee() {
  return applyDecorators(
    ApiOperation({ summary: "Create a new employee" }),
    ApiResponse({
      status: 201,
      description: "Employee created successfully",
      example: {
        employeeId: "UUID",
        employeeName: "Fernando",
        employeeLastName: "Ruiz",
        employeeEmail: "fernando@example.com",
        employeePhoneNumber: "12345678",
        employeePhoto: "URL",
      } as Employee,
    })
  );
}

// Decorator for getting all employees
export function ApiFindAllEmployees() {
  return applyDecorators(
    ApiOperation({ summary: "Get all employees" }),
    ApiResponse({
      status: 200,
      description: "List of employees obtained successfully",
      example: [
        {
          employeeId: "UUID1",
          employeeName: "Fernando",
          employeeLastName: "Ruiz",
          employeeEmail: "fernando@example.com",
          employeePhoneNumber: "12345678",
          employeePhoto: "URL1",
        },
        {
          employeeId: "UUID2",
          employeeName: "Maria",
          employeeLastName: "Lopez",
          employeeEmail: "maria@example.com",
          employeePhoneNumber: "87654321",
          employeePhoto: "URL2",
        },
      ] as Employee[],
    }),
    ApiResponse({
      status: 404,
      description: "Employees not found",
    })
  );
}

// Decorator for getting an employee by ID
export function ApiEmployeeResponse() {
  return applyDecorators(
    ApiOperation({ summary: "Get an employee by ID" }),
    ApiResponse({
      status: 200,
      description: "Employee obtained successfully",
      example: {
        employeeId: "UUID",
        employeeName: "Fernando",
        employeeLastName: "Ruiz",
        employeeEmail: "fernando@example.com",
        employeePhoneNumber: "12345678",
        employeePhoto: "URL",
      } as Employee,
    }),
    ApiResponse({
      status: 404,
      description: "Employee not found",
    })
  );
}
