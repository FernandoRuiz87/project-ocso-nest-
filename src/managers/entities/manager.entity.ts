import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;
  @Column("text")
  managerFullName: string;
  @Column("float")
  managerSalary: number;
  @Column("text", {
    unique: true,
  })
  managerEmail: string;
  @Column("text")
  managerPhoneNumber: string;

  @OneToOne(() => Location, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "locationId" })
  location: Location | string;

  @OneToOne(() => User, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "userId" })
  user: User;
}
