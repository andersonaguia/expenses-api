import { Controller } from '@nestjs/common';
import { EvolutionService } from '../services/evolution.service';

@Controller('evolution')
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}
}
