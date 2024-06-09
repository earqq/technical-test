import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST || 'localhost',
      dbName: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
