import { Test, TestingModule } from '@nestjs/testing';
import { App } from 'supertest/types';
import { OperacionesController } from '../src/operaciones/operaciones.controller';
import { OperacionesService } from '../src/operaciones/operaciones.service';
import { Response } from 'express';
import { generateResponse } from '../src/utils/response';

// // USO PARA PRUEBAS CON E2E
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ResponseService } from '../src/interface/responseDTO';
// // -----------------------------------------

describe('OperacionesController: PRUEBAS (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('E2E SERVICIO OPERACIONES BASICAS', () => {
    it('GET FIBONACCI: NO EXISTE!!)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/basica')
        .query({ operacion: 'fibonacci', a: 2, b: 3 })
        .expect(200)
        .expect((res: { body: ResponseService | string }) => {
          expect(res.body).toBe('La operación indicada no existe.');
        });
    });

    it('SIN PARAMETROS (OPERACION; A; B;)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/basica')
        .query({})
        .expect(200)
        .expect((res: { body: ResponseService | string }) => {
          expect(res.body).toBe('La operación indicada no existe.');
        });
    });

    describe('GET SUMA: /operaciones/basica/', () => {
      it('SUMA: Positivo con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: 2, b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(5);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('SUMA: Positivo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: 2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-1);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('SUMA: Negativo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: -2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-5);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('SUMA: String-Letra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: 'hola', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('SUMA: String-Numero con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: '10', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(13);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('SUMA: String-NumeroLetra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'suma', a: '10Ba', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });

    describe('GET RESTA: /operaciones/basica/', () => {
      it('RESTA: Positivo con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: 2, b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-1);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('RESTA: Positivo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: 2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(5);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('RESTA: Negativo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: -2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(1);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('RESTA: String-Letra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: 'hola', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('RESTA: String-Numero con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: '10', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(7);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('RESTA: String-NumeroLetra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'resta', a: '10Ba', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });

    describe('GET DIVISION: /operaciones/basica/', () => {
      it('DIVISION: Por numero 0', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: 5, b: 0 })
          .expect(502)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toContain('No se puede dividir por 0');
          });
      });

      it('DIVISION: Positivo con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: 12, b: 6 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(2);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('DIVISION: Positivo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: 20, b: -5 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-4);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('DIVISION: Negativo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: -10, b: -2 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(5);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('DIVISION: String-Letra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: 'hola', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('DIVISION: String-Numero con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: '10', b: 2 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(5);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('DIVISION: String-NumeroLetra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'division', a: '10Ba', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });

    describe('GET MULTIPLICACION: /operaciones/basica/', () => {
      it('MULTIPLICACION: Positivo con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: 12, b: 6 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(72);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('MULTIPLICACION: Positivo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: 20, b: -5 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-100);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('MULTIPLICACION: Negativo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: -10, b: -2 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(20);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('MULTIPLICACION: String-Letra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: 'hola', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('MULTIPLICACION: String-Numero con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: '10', b: 2 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(20);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('MULTIPLICACION: String-NumeroLetra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/basica')
          .query({ operacion: 'multiplicacion', a: '10Ba', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });
  });

  describe('E2E SERVICIO OPERACION DE POTENCIA', () => {
    it('SIN PARAMETROS (A; B;)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/potencia')
        .query({})
        .expect(200)
        .expect((res: { body: ResponseService | string }) => {
          expect(res.body).toBe(
            'Los valores de entrada deben ser siempre numeros.',
          );
        });
    });

    describe('GET POTENCIA: /operaciones/potencia/', () => {
      it('POTENCIA: Positivo con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: 2, b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(8);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('POTENCIA: Positivo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: 2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(0.125);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('POTENCIA: Negativo con Negativo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: -2, b: -3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(-0.125);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('POTENCIA: String-Letra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: 'hola', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('POTENICA: String-Numero con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: '10', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(1000);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('POTENCIA: String-NumeroLetra con Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/potencia')
          .query({ a: '10Ba', b: 3 })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });
  });

  describe('E2E SERVICIO OPERACION FACTORIAL', () => {
    it('SIN PARAMETROS (A;)', () => {
      return request(app.getHttpServer())
        .get('/operaciones/factorial')
        .query({})
        .expect(200)
        .expect((res: { body: ResponseService | string }) => {
          expect(res.body).toBe(
            'Los valores de entrada deben ser siempre numeros.',
          );
        });
    });

    describe('GET FACTORIAL: /operaciones/factorial/', () => {
      it('FACTORIAL: Valor Positivo', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: 5 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(120);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('FACTORIAL: Valor 1 ', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: 1 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(1);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('FACTORIAL: Valor 0 ', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: 0 })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(1);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('FACTORIAL: Valor < 0', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: -1 })
          .expect(502)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Error: El valor para el factorial debe estar entre 0 y 10.',
            );
          });
      });

      it('FACTORIAL: Valor > 10', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: 11 })
          .expect(502)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Error: El valor para el factorial debe estar entre 0 y 10.',
            );
          });
      });

      it('FACTORIAL: String-Letra', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: 'hola' })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });

      it('FACTORIAL: String-Numero', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: '3' })
          .expect(200)
          .expect((res: { body: ResponseService }) => {
            expect(res.body.data).toBe(6);
            expect(res.body.code).toBe(0);
            expect(res.body.message).toBe('Operación Exitosa.');
          });
      });

      it('FACTORIAL: String-NumeroLetra', () => {
        return request(app.getHttpServer())
          .get('/operaciones/factorial')
          .query({ a: '10Ba' })
          .expect(200)
          .expect((res: { body: ResponseService | string }) => {
            expect(res.body).toBe(
              'Los valores de entrada deben ser siempre numeros.',
            );
          });
      });
    });
  });
});

describe('OperacionesController', () => {
  let controller: OperacionesController;
  let service: OperacionesService;

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const mockService = {
    operar: jest.fn(),
    potencia: jest.fn(),
    factorial: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionesController],
      providers: [{ provide: OperacionesService, useValue: mockService }],
    }).compile();

    controller = module.get<OperacionesController>(OperacionesController);
    service = module.get<OperacionesService>(OperacionesService);
  });

  describe('Service: Basica', () => {
    it('Controller - Status 200:  Debe retornar un status 200 con el resultado del servicio', () => {
      const res = mockResponse();
      const result: ResponseService = generateResponse(
        40,
        0,
        'Operación Exitosa.',
      );

      mockService.operar.mockReturnValue(result);

      controller.basica(res, 'suma', 10, 30);

      expect(service.operar).toHaveBeenCalledWith('suma', 10, 30);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('Controller - Status 502: Debe retornar un status 502 si el servicio falla', () => {
      const res = mockResponse();

      mockService.operar.mockReturnValue(null);

      controller.basica(res, 'suma', 10, 30);

      expect(service.operar).toHaveBeenCalledWith('suma', 10, 30);
      expect(res.status).toHaveBeenCalledWith(502);
    });
  });

  describe('Service: Potencia', () => {
    it('Controller - Status 200: Debe retornar mensaje cuando code es -1', () => {
      const res = mockResponse();
      const mensaje = 'Advertencia: exponente muy grande.';
      const result = {
        code: -1,
        message: mensaje,
        data: null,
      };

      mockService.potencia.mockReturnValue(result);

      controller.potencia(res, 2, 999);

      expect(service.potencia).toHaveBeenCalledWith(2, 999);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mensaje);
    });

    it('Controller - Status 200:  Debe retornar un status 200 con el resultado del servicio', () => {
      const res = mockResponse();
      const result = generateResponse(8, 0, 'Operación Exitosa.');

      mockService.potencia.mockReturnValue(result);

      controller.potencia(res, 2, 3);

      expect(service.potencia).toHaveBeenCalledWith(2, 3);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('Controller - Status 502: Debe manejar excepciones del servicio', () => {
      const res = mockResponse();

      const errorMsg = 'Error en el servicio de potencia';
      mockService.potencia.mockImplementationOnce(() => {
        throw new Error(errorMsg);
      });

      controller.potencia(res, 2, 3);

      expect(service.potencia).toHaveBeenCalledWith(2, 3);
      expect(res.status).toHaveBeenCalledWith(502);
      expect(res.json).toHaveBeenCalledWith(expect.stringContaining(errorMsg));
    });
  });

  describe('Service: Factorial', () => {
    it('Controller - Status 200: Debe retornar el factorial correctamente', () => {
      const res = mockResponse();
      const result = generateResponse(120, 0, 'Operación Exitosa.');

      mockService.factorial.mockReturnValue(result);

      controller.factorial(res, 5);

      expect(service.factorial).toHaveBeenCalledWith(5);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('Controller - Status 200: Debe retornar mensaje si code es -1', () => {
      const res = mockResponse();
      const mensaje = 'No se puede calcular el factorial de negativos.';

      const result = {
        code: -1,
        message: mensaje,
        data: null,
      };

      mockService.factorial.mockReturnValue(result);

      controller.factorial(res, -5);

      expect(service.factorial).toHaveBeenCalledWith(-5);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mensaje);
    });

    it('Controller - Status 502: Debe retornar error si el factorial falla', () => {
      const res = mockResponse();

      const errorMsg = 'Error en el servicio de factorial';
      mockService.factorial.mockImplementationOnce(() => {
        throw new Error(errorMsg);
      });

      controller.factorial(res, 0);

      expect(service.factorial).toHaveBeenCalledWith(0);
      expect(res.status).toHaveBeenCalledWith(502);
      expect(res.json).toHaveBeenCalledWith(expect.stringContaining(errorMsg));
    });
  });
});
