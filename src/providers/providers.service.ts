import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./entities/provider.entity";
import { Repository } from "typeorm";
import { Like } from "typeorm";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ) {}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find({ relations: { products: true } });
  }

  findOne(id: string) {
    const provider = this.providerRepository.findOne({
      where: {
        providerId: id,
      },
      relations: { products: true },
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async findByName(name: string) {
    const provider = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`),
    });

    if (!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    return this.providerRepository.save(product);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    if (!provider) throw new NotFoundException("");
    this.providerRepository.delete({
      providerId: id,
    });
    return {
      message: `Provider deleted`,
    };
  }
}
