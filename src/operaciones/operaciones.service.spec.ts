import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';
import { ResponseService } from '../interface/responseDTO';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();

    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Operaciones Basicas', () => {
    describe('Operacion Desconocida', () => {
      const a: number = 10;
      const b: number = 30;

      it('Fibonnaci: No Existe!!', () => {
        const resultService: ResponseService = service.operar(
          'fibonacci',
          a,
          b,
        );

        expect(resultService.data).toBe(null);
        expect(resultService.code).toBe(-1);
        expect(resultService.message).toBe('La operación indicada no existe.');
      });
    });

    describe('Operacion Sumar', () => {
      it('Sumar: Positivo con Positivo', () => {
        const a: number = 10;
        const b: number = 30;

        const resultService: ResponseService = service.operar('suma', a, b);

        expect(resultService.data).toBe(40);
        expect(resultService.code).toBe(0);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Sumar: Negativo con Positivo', () => {
        const a = -10;
        const b = 50;

        const resultService: ResponseService = service.operar('suma', a, b);

        expect(resultService.message).toBe('Operación Exitosa.');
        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(40);
      });

      it('Sumar: Negativo con Negativo', () => {
        const a = -30;
        const b = -50;

        const resultService: ResponseService = service.operar('suma', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.message).toBe('Operación Exitosa.');
        expect(resultService.data).toBe(-80);

        expect(resultService.data).not.toBe(-100); // No son -100 el resultado es -80
      });

      it('Sumar: Math.PI con Positivo', () => {
        const a = Math.PI;
        const b = 30;

        const resultService: ResponseService = service.operar('suma', a, b);

        expect(resultService.data).toBeCloseTo(33.14, 2);
        expect(resultService.code).toBe(0);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Sumar: Null con Positivo', () => {
        const a: any = null;
        const b = 50;

        expect(() => {
          service.operar('suma', a, b);
        }).toThrow('Los valores de entrada no deben ser nulos.');
      });

      it('Sumar: String con Positivo', () => {
        const a: any = '10';
        const b = 50;

        expect(() => {
          service.operar('suma', a, b);
        }).toThrow('Los valores de entrada no pueden ser distintos de number.');
      });

      it('Sumar: Undefined con Positivo', () => {
        const a: any = undefined;
        const b = 60;

        expect(() => {
          service.operar('suma', a, b);
        }).toThrow('Los valores de entrada no deben ser indefinidos.');
      });
    });

    describe('Operacion Restar', () => {
      it('Restar: Positivo con Positivo', () => {
        const a: number = 10;
        const b: number = 30;

        const resultService: ResponseService = service.operar('resta', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(-20);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Restar: Negativo con Positivo', () => {
        const a = -10;
        const b = 50;

        const resultService: ResponseService = service.operar('resta', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(-60);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Restar: Negativo con Negativo', () => {
        const a = -10;
        const b = -50;

        const resultService = service.operar('resta', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(40);
        expect(resultService.message).toBe('Operación Exitosa.');

        expect(resultService.data).not.toBe(60); // No son 60 si no que 40
      });

      it('Restar: Math.PI con Positivo', () => {
        const a = Math.PI;
        const b = 30;

        const resultService: ResponseService = service.operar('resta', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBeCloseTo(-26.86, 2);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Restar: Null con Positivo', () => {
        const a: any = null;
        const b = 50;

        expect(() => {
          service.operar('resta', a, b);
        }).toThrow('Los valores de entrada no deben ser nulos.');
      });

      it('Restar: String-Numero con Positivo', () => {
        const a: any = '10';
        const b = 50;

        expect(() => {
          service.operar('resta', a, b);
        }).toThrow('Los valores de entrada no pueden ser distintos de number.');
      });

      it('Restar: Undefined con Positivo', () => {
        const a: any = undefined;
        const b = 60;

        expect(() => {
          service.operar('resta', a, b);
        }).toThrow('Los valores de entrada no deben ser indefinidos.');
      });
    });

    describe('Operacion Multiplicación', () => {
      it('Multiplicar: Positivo con Positivo', () => {
        const a: number = 10;
        const b: number = 30;

        const resultService: ResponseService = service.operar(
          'multiplicacion',
          a,
          b,
        );

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(300);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Multiplicacion: Negativo con Positivo', () => {
        const a = -10;
        const b = 50;

        const resultService: ResponseService = service.operar(
          'multiplicacion',
          a,
          b,
        );

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBeCloseTo(-500);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Multiplicacion: Negativo con Negativo', () => {
        const a = -10;
        const b = -50;

        const resultService: ResponseService = service.operar(
          'multiplicacion',
          a,
          b,
        );

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(500);
        expect(resultService.message).toBe('Operación Exitosa.');

        expect(resultService.data).not.toBe(60); // No son 60 si no que 500
      });

      it('Multiplicacion: Null con Positivo', () => {
        const a: any = null;
        const b = 50;

        expect(() => {
          service.operar('multiplicacion', a, b);
        }).toThrow('Los valores de entrada no deben ser nulos.');
      });

      it('Multiplicacion: String-Numero con Positivo', () => {
        const a: any = '10';
        const b = 50;

        expect(() => {
          service.operar('multiplicacion', a, b);
        }).toThrow('Los valores de entrada no pueden ser distintos de number.');
      });

      it('Multiplicacion: Undefined con Positivo', () => {
        const a: any = undefined;
        const b = 60;

        expect(() => {
          service.operar('multiplicacion', a, b);
        }).toThrow('Los valores de entrada no deben ser indefinidos.');
      });
    });

    describe('Operacion Division', () => {
      it('Division: Por numero 0', () => {
        const a: number = 5;
        const b: number = 0;

        expect(() => {
          service.operar('division', a, b);
        }).toThrow('No se puede dividir por 0');
      });

      it('Division: Positivo con Positivo', () => {
        const a: number = 10;
        const b: number = 30;

        const resultService: ResponseService = service.operar('division', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBeCloseTo(0.33, 2);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Division: Negativo con Positivo', () => {
        const a = -10;
        const b = 50;

        const resultService: ResponseService = service.operar('division', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBeCloseTo(-0.2);
        expect(resultService.message).toBe('Operación Exitosa.');
      });

      it('Division: Negativo con Negativo', () => {
        const a = -10;
        const b = -50;

        const resultService: ResponseService = service.operar('division', a, b);

        expect(resultService.code).toBe(0);
        expect(resultService.data).toBe(0.2);
        expect(resultService.message).toBe('Operación Exitosa.');

        expect(resultService.data).not.toBe(60);
      });

      it('Division: Null con Positivo', () => {
        const a: any = null;
        const b = 50;

        expect(() => {
          service.operar('division', a, b);
        }).toThrow('Los valores de entrada no deben ser nulos.');
      });

      it('Division: String-Numero con Positivo', () => {
        const a: any = '10';
        const b = 50;

        expect(() => {
          service.operar('division', a, b);
        }).toThrow('Los valores de entrada no pueden ser distintos de number.');
      });

      it('Division: Undefined con Positivo', () => {
        const a: any = undefined;
        const b = 60;

        expect(() => {
          service.operar('division', a, b);
        }).toThrow('Los valores de entrada no deben ser indefinidos.');
      });
    });
  });

  describe('Operacion Potencia', () => {
    it('Potencia: Positivo con Positivo', () => {
      const a: number = 2;
      const b: number = 3;

      const resultService: ResponseService = service.potencia(a, b);

      expect(resultService.code).toBe(0);
      expect(resultService.data).toBe(8);
      expect(resultService.message).toBe('Operación Exitosa.');
    });

    it('Potencia: Negativo con Positivo', () => {
      const a = -2;
      const b = 3;

      const resultService: ResponseService = service.potencia(a, b);

      expect(resultService.code).toBe(0);
      expect(resultService.data).toBe(-8);
      expect(resultService.message).toBe('Operación Exitosa.');
    });

    it('Potencia: Negativo con Negativo', () => {
      const a = -2;
      const b = -4;

      const resultService: ResponseService = service.potencia(a, b);

      expect(resultService.code).toBe(0);
      expect(resultService.data).toBe(0.0625);
      expect(resultService.message).toBe('Operación Exitosa.');

      expect(resultService.data).not.toBe(-100); // No son -100 el resultado es -80
    });

    it('Potencia: Null con Positivo', () => {
      const a: any = null;
      const b = 2;

      expect(() => {
        service.potencia(a, b);
      }).toThrow('Los valores de entrada no deben ser nulos.');
    });

    it('Potencia: String con Positivo', () => {
      const a: any = '10';
      const b = 2;

      expect(() => {
        service.potencia(a, b);
      }).toThrow('Los valores de entrada no pueden ser distintos de number.');
    });

    it('Potencia: Undefined con Positivo', () => {
      const a: any = undefined;
      const b = 6;

      expect(() => {
        service.potencia(a, b);
      }).toThrow('Los valores de entrada no deben ser indefinidos.');
    });
  });

  describe('Operacion Factorial', () => {
    it('Factorial: Valor Positivo', () => {
      const a: number = 3;

      const resultService: ResponseService = service.factorial(a);

      expect(resultService.code).toBe(0);
      expect(resultService.data).toBe(6);
      expect(resultService.message).toBe('Operación Exitosa.');
    });

    it('Factorial: Valor 1', () => {
      const a: number = 1;

      const resultService: ResponseService = service.factorial(a);

      expect(resultService.code).toBe(0);
      expect(resultService.data).toBe(1);
      expect(resultService.message).toBe('Operación Exitosa.');
    });

    it('Factorial: Valor 0', () => {
      const a: number = 0;

      const resultService: ResponseService = service.factorial(a);

      expect(resultService.data).toBe(1);
      expect(resultService.code).toBe(0);
      expect(resultService.message).toBe('Operación Exitosa.');
    });

    it('Factorial: Valor Negativo', () => {
      const a = -2;

      expect(() => {
        service.factorial(a);
      }).toThrow('El valor para el factorial debe estar entre 0 y 10.');
    });

    it('Factorial: Valor > 10 y Valor < 0', () => {
      let a = -2;

      expect(() => {
        service.factorial(a);
      }).toThrow('El valor para el factorial debe estar entre 0 y 10.');

      a = 11;
      expect(() => {
        service.factorial(a);
      }).toThrow('El valor para el factorial debe estar entre 0 y 10.');
    });

    it('Factorial: Valor Null', () => {
      const a: any = null;

      expect(() => {
        service.factorial(a);
      }).toThrow('Los valores de entrada no deben ser nulos.');
    });

    it('Factorial: Valor String-Numero', () => {
      const a: any = '10';

      expect(() => {
        service.factorial(a);
      }).toThrow('Los valores de entrada no pueden ser distintos de number.');
    });

    it('Factorial: Valor Undefined', () => {
      const a: any = undefined;

      expect(() => {
        service.factorial(a);
      }).toThrow('Los valores de entrada no deben ser indefinidos.');
    });
  });
});
