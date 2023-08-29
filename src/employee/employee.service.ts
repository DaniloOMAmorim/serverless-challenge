import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee | null> {
    return await this.employeeRepository.findOneByOrFail({ id }).catch((error: Error) => {
      throw new NotFoundException(error.message);
    })
  }

  async update(id: string, newEmployee: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneByOrFail({ id }).catch((error: Error) => {
      throw new NotFoundException(error.message);
    })

    this.employeeRepository.merge(employee, newEmployee);

    return await this.employeeRepository.save(employee);
  }

  async remove(id: string) {
    await this.employeeRepository.findOneByOrFail({ id }).catch((error: Error) => {
      throw new NotFoundException(error.message);
    })

    await this.employeeRepository.delete(id);
  }
}
