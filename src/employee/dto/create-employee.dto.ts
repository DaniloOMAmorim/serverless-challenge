import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: "Fulano" })
  name: string;

  @ApiProperty({ example: 20 })
  age: number;
  
  @ApiProperty({ example: "DEV" })
  office: string;
}
