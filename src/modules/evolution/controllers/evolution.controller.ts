import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EvolutionService } from '../services/evolution.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/modules/users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { CreateEvolutionDto } from '../dto/create-evolution.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';

@Controller('evolution')
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Post('/create')
  async create(
    @Body() evolution: CreateEvolutionDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.evolutionService.create(evolution, req);
    } catch (error) {
      if (error.code === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
