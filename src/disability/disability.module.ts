import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisabilityEntity, StudentDisabilityEntity } from './data/entities';
import { DisabilityRepositoryImp } from './data/repositories/Disability.repository.imp';

@Module({
  imports: [
    TypeOrmModule.forFeature([DisabilityEntity, StudentDisabilityEntity]),
  ],
  providers: [DisabilityRepositoryImp],
  exports: [
    TypeOrmModule.forFeature([DisabilityEntity, StudentDisabilityEntity]),
    DisabilityRepositoryImp,
  ],
})
export class DisabilityModule {}
