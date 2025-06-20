import * as QRCode from 'qrcode';
import * as sharp from 'sharp';
import jsQR from 'jsqr';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { QRRepository } from 'src/auth/domain/repositories/QR.repository';

@Injectable()
export class QRRepositoryImp implements QRRepository {
  private readonly logger = new Logger(QRRepositoryImp.name);

  async generateQR(text: string): Promise<string> {
    try {
      const qrImage = await QRCode.toDataURL(text, {
        errorCorrectionLevel: 'H',
      });
      return qrImage;
    } catch (error) {
      throw new InternalServerErrorException('Could not generate QR code');
    }
  }

  async readQR(imageBuffer: Buffer): Promise<string> {
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new BadRequestException(
        'No image file provided or the file is empty.',
      );
    }

    try {
      const { data, info } = await sharp(imageBuffer)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const code = jsQR(
        new Uint8ClampedArray(data.buffer),
        info.width,
        info.height,
      );

      if (code && code.data) {
        return code.data;
      } else {
        throw new BadRequestException(
          'Could not decode QR code. No QR code found in the image.',
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(
        'Failed to process image with sharp or read QR code with jsQR',
        error.stack,
      );
      throw new BadRequestException('Invalid or corrupted image file format.');
    }
  }
}
