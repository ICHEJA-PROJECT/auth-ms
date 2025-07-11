import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from '../data/dtos/create-student.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterStudentResponseAdapter } from '../data/adapters/register-student.adapter';
import { LoginStudentResponseAdapter } from '../data/adapters/login-student.adapter';
import { GetAllStudentsQueryDto } from '../data/dtos/get-all-students.dto';
import { StudentResponseAdapter } from '../data/adapters/student.adapter';
import { LoginStudentDto } from '../data/dtos/login-student-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_SERVICE_OPTIONS } from 'src/common/domain/constants/auth_service_options';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: AUTH_SERVICE_OPTIONS.AUTH_REGISTER_STUDENT })
  @HttpCode(HttpStatus.CREATED)
  registerStudent(
    @Payload() createStudentDto: CreateStudentDto,
  ): Promise<RegisterStudentResponseAdapter> {
    return this.authService.registerStudent(createStudentDto);
  }

  @MessagePattern({ cmd: AUTH_SERVICE_OPTIONS.AUTH_LOGIN_STUDENT })
  @HttpCode(HttpStatus.OK)
  loginStudent(
    @Payload() loginStudentDto: LoginStudentDto,
  ): Promise<LoginStudentResponseAdapter> {
    return this.authService.loginStudent(loginStudentDto);
  }

  @MessagePattern({ cmd: AUTH_SERVICE_OPTIONS.AUTH_GET_ALL_STUDENTS })
  getAllStudents(
    @Payload() query: GetAllStudentsQueryDto,
  ): Promise<StudentResponseAdapter> {
    return this.authService.getAllStudents(query);
  }
}
