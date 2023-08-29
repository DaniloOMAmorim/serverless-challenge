import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  age: number;

  @Column()
  office: string;

  constructor(employee?: Partial<Employee>) {
    this.id = employee?.id;
    this.name = employee?.name;
    this.office = employee?.office;
    this.office = employee?.office;
  }
}
