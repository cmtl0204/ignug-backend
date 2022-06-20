import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      host: process.env.DB_HOST,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
    },
    apiKey: process.env.API_KEY,
  };
});
