import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  getHelloAleman(): string {
    return 'Hallo Welt!!';
  }

  getHelloFrances(): string {
    return 'Bonjour le monde!!';
  }

  getHelloEspanol(): string {
    return 'Hola Mundo!!';
  }
}
