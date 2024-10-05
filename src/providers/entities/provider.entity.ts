import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  providerId: string;

  @ApiProperty({
    default: "Coca-cola",
  })
  @Column("text")
  providerName: string;

  @ApiProperty({
    default: "Coca-cola@example.com",
  })
  @Column("text", {
    unique: true,
  })
  providerEmail: string;

  @ApiProperty({
    default: "123456789",
  })
  @Column({
    type: "text",
    nullable: true,
  })
  providerPhoneNumber: string;

  @OneToMany(() => Product, (photo) => photo.provider)
  products: Product[];
}
