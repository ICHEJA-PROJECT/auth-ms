import { ApiProperty } from '@nestjs/swagger';

export class RegisterStudentResponseAdapter {
  @ApiProperty({
    description: 'The QR code image as a data URL.',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  })
  qrImage: string;

  @ApiProperty({
    description: 'The encrypted JWT token.',
    example: 'a1b2c3d4e5f6...:..f9e8d7c6b5a4',
  })
  encryptedToken: string;

  constructor(qrImage: string, encryptedToken: string) {
    this.qrImage = qrImage;
    this.encryptedToken = encryptedToken;
  }
}
