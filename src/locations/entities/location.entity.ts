import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: number;

  @ApiProperty({
    default: "Ocso Juriquilla",
  })
  @Column("text")
  locationName: string;

  @ApiProperty({
    default: "Avenida X s/n, 76230",
  })
  @Column("text")
  locationAddress: string;

  @ApiProperty({
    default: [12, 12],
  })
  @Column("simple-array")
  locationLatLng: number[];

  @OneToOne(() => Manager, {
    eager: true,
  })
  @JoinColumn({
    name: "ManagerId",
  })
  manager: Manager;

  @ManyToOne(() => Region, (Region) => Region.locations)
  @JoinColumn({
    name: "regionId",
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
