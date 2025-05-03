const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const ImageExtensions = ["JPG", "PNG", "JPEG", "jpg", "png", "jpeg"];

const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'staging', 'development').required(),
  PORT: Joi.number().default(5000),
  DATABASE_URL: Joi.string().required().description('postgres the server connects to'),
  JWT_SECRET_KEY: Joi.string().required().description('secret key used to sign in'),
  JWT_EXPIRE: Joi.number().required().description('milliseconds after which the session expires'),
  SMPT_EMAILUSER: Joi.string().required().description('SMPT from email user'),
  SMPT_EMAILPASSWORD: Joi.string().required().description('SMPT from email password'),
  FROM_MAIL: Joi.string().required().description('SMPT from email'),
}).unknown();

const { value: envVar, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  NODE_ENV: envVar.NODE_ENV,
  PORT: envVar.PORT,
  DATABASE_URL: envVar.DATABASE_URL,
  JWT_SECRET_KEY: envVar.JWT_SECRET_KEY,
  JWT_EXPIRE: envVar.JWT_EXPIRE,
  SMPT_EMAILUSER: envVar.SMPT_EMAILUSER,
  SMPT_EMAILPASSWORD: envVar.SMPT_EMAILPASSWORD,
  FROM_MAIL: envVar.FROM_MAIL,
};

module.exports = { config, ImageExtensions };
