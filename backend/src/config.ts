export const config = () => ({
  port: process.env.PORT || 3000,
  clientUrl: process.env.CLIENTURL,
  apiUrl: process.env.APIURL,
  jwt: {
    secret: process.env.SECRET,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
});
