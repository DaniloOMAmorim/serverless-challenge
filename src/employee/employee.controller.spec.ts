import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const employeeEntityList: Employee[] = [
  new Employee({ name: 'Fulano', age: 22, office: 'Dev' }),
  new Employee({ name: 'Ciclano', age: 23, office: 'Dev' }),
  new Employee({ name: 'Beltrano', age: 24, office: 'Dev' }),
];

const updatedEmployeeEntity: Employee = { name: 'Fulano', age: 25, office: 'Dev 2' };

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn().mockResolvedValue(employeeEntityList[0]),
            findAll: jest.fn().mockResolvedValue(employeeEntityList),
            findOne: jest.fn().mockResolvedValue(employeeEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedEmployeeEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a employee list entity successfully', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(employeeEntityList);
      expect(typeof res).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const data: CreateEmployeeDto = {
      name: 'Fulano',
      age: 22,
      office: 'Dev'
    };

    it('should create a new employee entity item successfully', async () => {
      const result = await controller.create(data);

      expect(result).toEqual(employeeEntityList[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(data);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.create(data)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get a employee item successfully', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(employeeEntityList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {

      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const data: UpdateEmployeeDto = {
      age: 25,
      office: 'Dev 2'
    };

    it('should update a employee item successfully', async () => {
      const result = await controller.update('1', data);

      expect(result).toEqual(updatedEmployeeEntity);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith('1', data);
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(controller.update('1', data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a employee item successfully', async () => {
      const result = await controller.remove('1');

      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      expect(controller.remove('1')).rejects.toThrowError();
    });
  });
});
