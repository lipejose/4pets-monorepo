import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { Products } from '../../store/models/products.model';

describe('StoreController with test env', () => {
  let app: INestApplication;
  process.env.NODE_ENV = 'staging';
  process.env.TEST = 'true';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should get staging schema', async () => {
    expect(Products.sequelize.getDatabaseName()).toBe('staging_database_name');
  });
});
