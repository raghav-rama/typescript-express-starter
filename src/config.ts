import 'dotenv/config';

class Config {
  ENV = process.env.NODE_ENV;
  MONGO_URI =
    this.ENV === 'development'
      ? `${process.env.MONGO_URI_DEV}/local`
      : `${process.env.MONGO_URI_PROD}/todo`;
  PORT = 8000;
}

export default new Config();
