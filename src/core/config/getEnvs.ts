import 'dotenv/config';
import { EnvsI } from './domain/interfaces/EnvsI';
import { envsValidator } from './validators/envs.validator';

const getEnvs = (): EnvsI => {
  const { error, value } = envsValidator.validate(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    PORT: value.PORT,
    JWT_SECRET: value.JWT_SECRET,
    ENCRYPTION_KEY: value.ENCRYPTION_KEY,
    UPLOAD_IMAGE_SERVICE_URL: value.UPLOAD_IMAGE_SERVICE_URL,
    JWT_EXPIRATION: value.JWT_EXPIRATION,
    DB_NAME: value.DB_NAME,
    DB_PORT: value.DB_PORT,
    DB_HOST: value.DB_HOST,
    DB_USERNAME: value.DB_USERNAME,
    DB_PASSWORD: value.DB_PASSWORD,
  };
};

export const envsValues = getEnvs();
