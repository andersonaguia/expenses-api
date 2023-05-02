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
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { DefaultResponseDto } from 'src/core/common/dto/default-response.dto';
import { ExpenseResponseDto } from '../dto/expense-response.dto';
import { UpdateExpenseDto } from '../dto/update-expense.dto';
import { ExpenseService } from '../services/expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Post('/create')
  async create(
    @Body() expense: CreateExpenseDto,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.expenseService.create(expense, req);
    } catch (error) {
      if (error.code === 404) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            statusCode: 409,
            message: 'Já existe uma despesa cadastrada com o mesmo nome',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findall')
  async findAll(): Promise<ExpenseResponseDto[]> {
    try {
      return await this.expenseService.findAll();
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Patch('/update/:id')
  async update(
    @Body() data: UpdateExpenseDto,
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.expenseService.update(data, +id, req);
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

  /*
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TRUSTEE, UserRole.MANAGER)
  @Delete('/delete/:id')
  async delete(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<DefaultResponseDto> {
    try {
      return await this.categoryService.delete(+id, req);
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
  */
}
