import { Controller, Get, Query, Res } from '@nestjs/common';
import { OperacionesService } from './operaciones.service';
import { Response } from 'express';

@Controller('operaciones')
export class OperacionesController {
  constructor(private readonly operService: OperacionesService) {}

  // SERVICIO OPERACIONES BASICAS
  @Get('basica')
  basica(
    @Res() res: Response,
    @Query('operacion') operacion: string,
    @Query('a') a: number,
    @Query('b') b: number,
  ) {
    try {
      const resultService = this.operService.operar(operacion, +a, +b);

      if (resultService.code == 0) {
        return res.status(200).json(resultService);
      } else if (resultService.code == -1) {
        return res.status(200).json(resultService.message);
      }
    } catch (error: any) {
      return res.status(502).json(`${error}`);
    }
  }

  // SERVICIO: OPERACION DE POTENCIA
  @Get('potencia')
  potencia(@Res() res: Response, @Query('a') a: number, @Query('b') b: number) {
    try {
      const resultService = this.operService.potencia(+a, +b);

      if (resultService.code == 0) {
        return res.status(200).json(resultService);
      } else if (resultService.code == -1) {
        return res.status(200).json(resultService.message);
      }
    } catch (error: any) {
      return res.status(502).json(`${error}`);
    }
  }

  // SERVICIO: OPERACION FACTORIAL
  @Get('factorial')
  factorial(@Res() res: Response, @Query('a') a: number) {
    try {
      const resultService = this.operService.factorial(+a);

      if (resultService.code == 0) {
        return res.status(200).json(resultService);
      } else if (resultService.code == -1) {
        return res.status(200).json(resultService.message);
      }
    } catch (error: any) {
      return res.status(502).json(`${error}`);
    }
  }
}
