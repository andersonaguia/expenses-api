import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { CreateSubcategoryDto } from '../dto/create-subcategory.dto';
import { SubcategoryService } from '../services/subcategory.service';
import { SubcategoryResponseDto } from '../dto/subcategory-response.dto';
import { UpdateSubcategoryDto } from '../dto/update-subcategory.dto';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Post('/create')
  async create(
    @Body() subcategory: CreateSubcategoryDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.subcategoryService.create(subcategory, req);
    } catch (error) {
      if (error.code === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      if (error.code === 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findall')
  async findAll(): Promise<SubcategoryResponseDto[]> {
    try {
      return await this.subcategoryService.findAll();
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Patch('/update/:id')
  async update(
    @Body() data: UpdateSubcategoryDto,
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.subcategoryService.update(data, +id, req);
    } catch (error) {
      if (error.code === 400) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      if (error.code === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      if (error.code === 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Delete('/delete/:id')
  async delete(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.subcategoryService.delete(+id, req);
    } catch (error) {
      if (error.code === 400) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      if (error.code === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
