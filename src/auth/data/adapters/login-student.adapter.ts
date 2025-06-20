import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadAdapter } from './token-payload.adapter';

export class LoginStudentResponseAdapter {
  @ApiProperty({
    description: 'The token of the student.',
    example: 'a1b2c3d4e5f6...:..f9e8d7c6b5a4',
  })
  token: string;

  @ApiProperty({
    description: 'The user information of the student.',
    type: TokenPayloadAdapter,
  })
  userInfo: TokenPayloadAdapter;

  constructor(token: string, userInfo: TokenPayloadAdapter) {
    this.token = token;
    this.userInfo = userInfo;
  }
}
