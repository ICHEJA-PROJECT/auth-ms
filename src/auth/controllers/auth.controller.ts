import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStudentDto } from '../data/dtos/create-student.dto';
import { AuthService } from '../services/auth.service';
import {
  ApiBody,
  ApiConsumes,
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
import { Student } from '../domain/entities/student.entity';
import { GetAllStudentsQueryDto } from '../data/dtos/get-all-students.dto';
import { StudentResponseAdapter } from '../data/adapters/student.adapter';

// We create the success response dto dynamically for swagger
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'QR image for student login',
    schema: {
      type: 'object',
      properties: {
        qrImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Student logged in successfully.',
    type: LoginStudentSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid image or QR code.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: ErrorResponseDto,
  })
  @UseInterceptors(FileInterceptor('qrImage'))
  loginStudent(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<LoginStudentResponseAdapter> {
    const imageBuffer = Buffer.from(file.buffer.toString('base64'), 'base64');
    return this.authService.loginStudent(imageBuffer);
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
