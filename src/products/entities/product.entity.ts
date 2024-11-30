import { Provider } from "src/providers/entities/provider.entity";
import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;
  @Column("text")
  productName: string;
  @Column("float")
  price: number;
  @Column("int")
  countSeal: number;

  @ManyToOne(() => Provider, (provider) => provider.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "providerId" })
  provider: Provider | string;
}
