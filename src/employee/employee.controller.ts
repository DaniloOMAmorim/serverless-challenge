import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexEmployeeSwagger } from './swagger/index-employee.swagger';
import { NotFoundSwagger } from '../helper/swagger/not-found.swagger';
import { UpdateEmployeeSwagger } from './swagger/update-employee.swagger';

@Controller('employee')
@ApiTags('Funcionários')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @ApiOperation({ summary: 'Criar um novo funcionário', tags: ['Funcionários'] })
  @ApiResponse({
    status: 200,
    description: 'Novo funcionário retornado com sucesso',
    type: IndexEmployeeSwagger,

  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Listar todos os funcionários', tags: ['Funcionários'] })
  @ApiResponse({
    status: 200,
    description: 'Lista de funcionários retornada com sucesso',
    type: IndexEmployeeSwagger,
    isArray: true,

  })
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiOperation({ summary: 'Exibir os dados de um funcionário', tags: ['Funcionários'] })
  @ApiResponse({
    status: 200,
    description: 'Dados de funcionário retornado com sucesso',
    type: IndexEmployeeSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    type: NotFoundSwagger,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza os dados de um funcionário', tags: ['Funcionários'] })
  @ApiResponse({
    status: 200,
    description: 'Dados atualizados do funcionário retornado com sucesso',
    type: UpdateEmployeeSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    type: NotFoundSwagger,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Remove um funcionário', tags: ['Funcionários'] })
  @ApiResponse({
    status: 200,
    description: 'Funcioário removido'
  })
  @ApiResponse({
    status: 404,
    description: 'Funcionário não encontrado',
    type: NotFoundSwagger,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
