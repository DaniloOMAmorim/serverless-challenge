import { Employee } from '../entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

export class IndexEmployeeSwagger extends Employee {

  @ApiProperty({example:"9322c384-fd8e-4a13-80cd-1cbd1ef95ba8"})
  id?: string;

  @ApiProperty({ example: "Fulano" })
  name: string;

  @ApiProperty({ example: 20 })
  age: number;

  @ApiProperty({ example: "DEV" })
  office: string;
}