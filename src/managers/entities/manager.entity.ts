import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;
  @Column("text")
  managerFullName: string;
  @Column("float")
  managerSalary: number;
  @Column("text")
  managerEmail: string;
  @Column("text")
  managerPhoneNumber: string;

  @OneToOne(() => Location)
  location: Location;
}
