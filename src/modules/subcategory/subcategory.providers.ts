import { DataSource } from 'typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';

export const categoryProviders = [
  {
    provide: 'SUBCATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubcategoryEntity),
    inject: ['DATA_SOURCE'],
  },
];
