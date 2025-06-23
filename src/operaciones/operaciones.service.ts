import { Injectable } from '@nestjs/common';
import { ResponseService } from '../interface/responseDTO';
import { generateResponse } from '../utils/response';

@Injectable()
export class OperacionesService {
  // SERVICIO: OPERACIONES BASICAS, SUMAR, RESTAR, DIVIDIR y MULTIPLICAR
  operar(operacion: string = '', a: number, b: number) {
    const responseData: ResponseService = this.#validator(a, b);

    // Si existe un error en el formato de los datos, lo retorno como Exception
    if (responseData.code == 1) {
      throw new Error(responseData.message);
    }

    switch (operacion) {
      case 'suma':
        responseData.data = this.#suma(a, b);
        break;
      case 'resta':
        responseData.data = this.#resta(a, b);
        break;
      case 'multiplicacion':
        responseData.data = this.#multiplicacion(a, b);
        break;
      case 'division':
        responseData.data = this.#division(a, b);
        break;
      default:
        responseData.code = -1;
        responseData.message = 'La operación indicada no existe.';
        responseData.data = null;
    }

    return responseData;
  }

  // SERVICIO: OPERACION FACTORIAL
  factorial(a: number) {
    const responseData: ResponseService = this.#validator(a, 0, true);

    // Si existe un error en el formato de los datos, lo retorno como Exception
    if (responseData.code == 1) {
      throw new Error(responseData.message);
    }

    responseData.data = this.#factorial(a);

    return responseData;
  }

  // SERVICIO: OPERACION DE POTENCIA
  potencia(a: number, b: number) {
    const responseData: ResponseService = this.#validator(a, b);

    // Si existe un error en el formato de los datos, lo retorno como Exception
    if (responseData.code == 1) {
      throw new Error(responseData.message);
    }

    responseData.data = this.#potencia(a, b);

    return responseData;
  }

  // #region FUNCIONES INTERNAS

  // #region FUNCTION VALIDATOR
  #validator(a: number, b: number, isFactorial: boolean = false) {
    // Valores por defecto
    let code: number = 0;
    let status: string = 'Operación Exitosa.';
    let result: any = null;

    if (a === null || b === null) {
      code = 1;
      status = 'Los valores de entrada no deben ser nulos.';
      result = null;
    } else if (a === undefined || b === undefined) {
      code = 1;
      status = 'Los valores de entrada no deben ser indefinidos.';
      result = undefined;
    } else if (typeof a !== 'number' || typeof b !== 'number') {
      code = 1;
      status = 'Los valores de entrada no pueden ser distintos de number.';
      result = NaN;
    } else if (isNaN(Number(a)) || isNaN(Number(b))) {
      code = -1;
      status = 'Los valores de entrada deben ser siempre numeros.';
      result = null;
    } else if (isFactorial && (a < 0 || a > 10)) {
      code = 1;
      status = 'El valor para el factorial debe estar entre 0 y 10.';
      result = null;
    }

    return generateResponse(result, code, status);
  }
  // #endregion

  // #region FUNCTION SUMA
  #suma(a: number, b: number) {
    return a + b;
  }
  // #endregion

  // #region FUNCTION RESTA
  #resta(a: number, b: number) {
    return a - b;
  }
  // #endregion

  // #region FUNCTION MULTIPLICACION
  #multiplicacion(a: number, b: number) {
    return a * b;
  }
  // #endregion

  // #region FUNCION DIVISION
  #division(a: number, b: number) {
    if (b === 0) {
      throw new Error('No se puede dividir por 0');
    }

    return a / b;
  }
  // #endregion

  // #region FUNCION FACTORIA
  #factorial(a: number) {
    // Evito que siga ya que el resultado sería el mismo valor ingresado
    if (a === 0 || a === 1) {
      return 1;
    }

    let storage: number = 1;
    for (let i = 2; i <= a; i++) {
      storage *= i;
    }

    return storage;
  }
  // #endregion

  // #region FUNCION POTENCIA
  #potencia(a: number, b: number) {
    return Math.pow(a, b);
  }
  // #endregion

  // #endregion
}
