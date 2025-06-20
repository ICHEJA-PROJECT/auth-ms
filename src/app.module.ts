import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envsValues } from './core/config/getEnvs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envsValues.DB_HOST,
      port: envsValues.DB_PORT,
      username: envsValues.DB_USERNAME,
      password: envsValues.DB_PASSWORD,
      database: envsValues.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
  ],
})
export class AppModule {}
