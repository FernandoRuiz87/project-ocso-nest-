import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager)
    private ManagerRepository: Repository<Manager>,
    private jwtService: JwtService
  ) {}

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles;
    if (roles.includes("Admin") || roles.includes("Manager")) {
      throw new UnauthorizedException("Invalid");
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const employee = await this.employeeRepository.preload({
      employeeId: id,
    });
    employee.user = user;
    return this.employeeRepository.save(employee);
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles;
    if (roles.includes("Admin") || roles.includes("Employee")) {
      throw new UnauthorizedException("Invalid");
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const manager = await this.ManagerRepository.preload({
      managerId: id,
    });
    manager.user = user;
    return this.ManagerRepository.save(manager);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: loginUserDto.userEmail },
    });
    if (!user) throw new UnauthorizedException("No estas autorizado");
    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword
    );
    if (!match) throw new UnauthorizedException("No estas autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    const newUserData = await this.userRepository.preload({
      userId: id,
      ...updateUserDto,
    });
    this.userRepository.save(newUserData);
    return newUserData;
  }
}
