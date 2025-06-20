import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { envsValues } from 'src/core/config/getEnvs';

@Module({
  imports: [
    HttpModule.register({
      baseURL: envsValues.UPLOAD_IMAGE_SERVICE_URL,
      timeout: 5000,
    }),
  ],
  exports: [HttpModule],
})
export class UploadImageTransport {}
