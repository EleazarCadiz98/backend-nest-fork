import { Injectable } from '@nestjs/common';
import { ResponseGetUser } from '../interface/userDTO';

@Injectable()
export class DbManagerService {
  getUser(id: number) {
    const userData: ResponseGetUser = { id, name: 'Eleazar' };
    return userData;
  }
}
