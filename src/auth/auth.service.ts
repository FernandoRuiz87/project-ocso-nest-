import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserData } from "./decorators/user.decorator";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: loginUserDto.userEmail },
    });
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

  async updateUser(userEmail, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto,
    });
    this.userRepository.save(newUserData);
    return newUserData;
  }
}
