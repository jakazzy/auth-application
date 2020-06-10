import 'dotenv/config';

export const config = {
  dev: {
    jwt: {secret: process.env.MY_SECRET},
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET
  },
};