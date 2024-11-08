import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  async create(CreateProductDto: CreateProductDto) {
    const product = this.productRepository.save(CreateProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations: { provider: true },
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOne({
      where: { productId: id },
      relations: { provider: true },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException();

    await this.productRepository.delete({
      productId: id,
    });
    return {
      message: `Object with id ${id} deleted`,
    };
  }
}
