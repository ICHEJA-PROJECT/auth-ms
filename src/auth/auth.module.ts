import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UploadImageTransport } from './transports/upload-image.transport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { envsValues } from 'src/core/config/getEnvs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity, StudentEntity } from './data/entities';
import {
  EncryptDataRepositoryImp,
  PersonRepositoryImp,
  QRRepositoryImp,
  StudentRepositoryImp,
} from './data/repositories';

@Module({
  imports: [
    UploadImageTransport,
    JwtModule.register({
      global: true,
      secret: envsValues.JWT_SECRET,
      signOptions: { expiresIn: envsValues.JWT_EXPIRATION },
    }),
    TypeOrmModule.forFeature([PersonEntity, StudentEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PersonRepositoryImp,
    StudentRepositoryImp,
    QRRepositoryImp,
    EncryptDataRepositoryImp,
  ],
})
export class AuthModule {}
