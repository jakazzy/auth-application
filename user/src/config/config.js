import 'dotenv/config';

export const config = {
  dev: {
    jwt: {secret: process.env.MY_SECRET},
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
};