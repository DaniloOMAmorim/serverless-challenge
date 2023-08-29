import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: "Descrição do erro" })
  message: string;

  @ApiProperty({ example: "Not Found" })
  error: string;
}
