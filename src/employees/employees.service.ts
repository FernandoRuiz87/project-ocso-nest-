import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id,
      },
    });
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id,
    });
    if (!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });
    this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  async remove(id: string) {
    this.findOne(id);
    this.employeeRepository.delete({
      employeeId: id,
    });
    return {
      message: `Object with id ${id} deleted`,
    };
  }
}
