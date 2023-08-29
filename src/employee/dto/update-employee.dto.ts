import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  name?: string;

  @ApiProperty({ example: 25 })
  age?: number;

  @ApiProperty({ example: "DEV 2" })
  office?: string;
 }
