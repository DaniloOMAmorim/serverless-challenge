import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const employeeEntityList: Employee[] = [
  new Employee({ name: 'Fulano', age: 22, office: 'Dev' }),
  new Employee({ name: 'Ciclano', age: 23, office: 'Dev' }),
  new Employee({ name: 'Beltrano', age: 24, office: 'Dev' })
]

const updatedEmployeeEntity: Employee = { name: 'Fulano', age: 25, office: 'Dev 2' }

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            save: jest.fn().mockResolvedValue(employeeEntityList[0]),
            find: jest.fn().mockResolvedValue(employeeEntityList),
            findOneByOrFail: jest.fn().mockResolvedValue(employeeEntityList[0]),
            merge: jest.fn().mockResolvedValue(updatedEmployeeEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        }               
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    repository = module.get<Repository<Employee>>(
      getRepositoryToken(Employee)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const data: CreateEmployeeDto = {
      name: 'Fulano',
      age: 22,
      office: 'Dev'
    };

    it('should create a new employee entity item successfully', async () => {
      const res = await service.create(data);

      expect(res).toEqual(employeeEntityList[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.create(data)).rejects.toThrowError(Error);
    });
  });

  describe('findAll', () => {
    it('should return a employee list entity successfully', async () => {
      const res = await service.findAll();

      expect(res).toEqual(employeeEntityList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error());

      expect(service.findAll()).rejects.toThrowError();
    })
  });

  describe('findOne', () => {
    it('should return a employee item successfully', async () => {
      const res = await service.findOne('id');

      expect(res).toEqual(employeeEntityList[0]);
      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
    })

    it('should throw a not found exception', () => {
      jest.spyOn(repository, 'findOneByOrFail').mockRejectedValueOnce(new Error());

      expect(service.findOne('id')).rejects.toThrowError(NotFoundException);
    })
  });

  describe('update', () => {
    const data: UpdateEmployeeDto = {
      age: 25,
      office: 'Dev 2'
    };

    it('should update a employee entity item successfully', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(updatedEmployeeEntity);

      const res = await service.update('id', data);

      expect(res).toEqual(updatedEmployeeEntity);

      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(repository.merge).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(repository, 'findOneByOrFail').mockRejectedValueOnce(new Error());

      expect(service.update('id',data)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      expect(service.update('id',data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a employee entity item successfully', async () => {
      const res = await service.remove('id');

      expect(res).toBeUndefined();
      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(repository, 'findOneByOrFail').mockRejectedValueOnce(new Error());

      expect(service.remove('id')).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(new Error());

      expect(service.remove('id')).rejects.toThrowError();
    });
  });
});
