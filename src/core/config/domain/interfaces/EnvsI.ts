export interface EnvsI {
  JWT_SECRET: string;
  ENCRYPTION_KEY: string;
  UPLOAD_IMAGE_SERVICE_URL: string;
  JWT_EXPIRATION: string;
  DB_NAME: string;
  DB_PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  BROKER_HOSTS: string[];
}
