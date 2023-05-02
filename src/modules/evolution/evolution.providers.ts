import { DataSource } from 'typeorm';
import { EvolutionEntity } from './entities/evolution.entity';

export const evolutionProviders = [
  {
    provide: 'EVOLUTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EvolutionEntity),
    inject: ['DATA_SOURCE'],
  },
];
