import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { CreateStudentDto } from '../data/dtos/create-student.dto';
import { AuthService } from '../services/auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterStudentResponseAdapter } from '../data/adapters/register-student.adapter';
import { LoginStudentResponseAdapter } from '../data/adapters/login-student.adapter';
import { ErrorResponseDto } from 'src/common/dtos/error-response.dto';
import { createSuccessResponseDto } from 'src/common/dtos/success-response.dto';
import { GetAllStudentsQueryDto } from '../data/dtos/get-all-students.dto';
import { StudentResponseAdapter } from '../data/adapters/student.adapter';
import { LoginStudentDto } from '../data/dtos/login-student-dto';

const RegisterStudentSuccess = createSuccessResponseDto(
  RegisterStudentResponseAdapter,
);
const LoginStudentSuccess = createSuccessResponseDto(
  LoginStudentResponseAdapter,
);

const StudentSuccess = createSuccessResponseDto(StudentResponseAdapter);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-student')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The student has been successfully created.',
    type: RegisterStudentSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Input data validation failed.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  registerStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<RegisterStudentResponseAdapter> {
    return this.authService.registerStudent(createStudentDto);
  }

  @Post('login-student')
  @ApiOkResponse({
    description: 'Student logged in successfully.',
    type: LoginStudentSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid Token.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  loginStudent(
    @Body() loginStudentDto: LoginStudentDto,
  ): Promise<LoginStudentResponseAdapter> {
    return this.authService.loginStudent(loginStudentDto);
  }

  @Get('students')
  @ApiOkResponse({
    description: 'Students fetched successfully.',
    type: [StudentSuccess],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 204,
    description: 'No content',
    type: ErrorResponseDto,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'educator_id',
    type: Number,
    required: false,
  })
  getAllStudents(
    @Query() query: GetAllStudentsQueryDto,
  ): Promise<StudentResponseAdapter> {
    return this.authService.getAllStudents(query);
  }
}
