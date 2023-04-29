import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/modules/users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Post('/create')
  async create(
    @Body() category: CreateCategoryDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.categoryService.create(category, req);
    } catch (error) {
      if (error.code === 409) {
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Get('/findall')
  async findAll(): Promise<CategoryResponseDto[]> {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
