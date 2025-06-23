import { Test, TestingModule } from '@nestjs/testing';
import { DbManagerService } from './db-manager.service';

describe('DbManagerService', () => {
  let service: DbManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbManagerService],
    }).compile();

    service = module.get<DbManagerService>(DbManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GetUser: Validacion de MockServer', () => {
    const resultService = service.getUser(1);

    expect(resultService.id).toBe(1);
    expect(resultService.name).toBe('Eleazar');
  });
});
