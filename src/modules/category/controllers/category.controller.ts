import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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
import { CategoryResponseDto } from '../dto/category-response.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

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
  async findAll(): Promise<CategoryResponseDto[]> {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Patch('/update/:id')
  async update(
    @Body() data: UpdateCategoryDto,
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.categoryService.update(data, +id, req);
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
