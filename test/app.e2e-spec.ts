import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Employee } from 'src/employee/entities/employee.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const employee: Employee = {
    name: "Danilo Amorim",
    age: 21,
    office: "Dev 1"
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/employee (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/employee')
      .send(employee);

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(employee.name);
    expect(response.body.age).toEqual(employee.age);
    expect(response.body.office).toEqual(employee.office);

    employee.id = response.body.id;
  });

  it('/employee/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/employee/${employee.id}`)
      .expect(200)
      .expect(employee);
  });

  it('/employee/:id (PUT)', async () => {
    const newEmployee: Employee = {
      ...employee,
      age: 25,
      office:"Dev 2"
    };

    const response = await request(app.getHttpServer())
      .put(`/employee/${employee.id}`)
      .send(newEmployee);


    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(newEmployee.name);
    expect(response.body.age).toEqual(newEmployee.age);
    expect(response.body.office).toEqual(newEmployee.office);

    employee.age = newEmployee.age;
    employee.office = newEmployee.office;
  });

  it('/employee (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/employee')
      .expect(200)
    
    expect(response.body[0]).toEqual(employee);
  });

  it('/employee/:id (DELETE)', async () => {
    return await request(app.getHttpServer())
      .delete(`/employee/${employee.id}`)
      .expect(200);
  });
});
