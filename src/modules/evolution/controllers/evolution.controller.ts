import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
import { ResponseEvolutionDto } from '../dto/response-evolution.dto';

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
      if (error.statusCode === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findall')
  async findAll(): Promise<ResponseEvolutionDto[]> {
    try {
      return await this.evolutionService.findAll();
    } catch (error) {
      if (error.statusCode === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/find/:id')
  async findByCategory(@Param('id') categoryId: number): Promise<any[]> {
    try {
      return await this.evolutionService.findByCategory(+categoryId);
    } catch (error) {
      if (error.statusCode === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
