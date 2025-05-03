const asyncHandler = require('../utils/async-handler');
const getCountryFromIP = require('../utils/ipToCountry');
const { generateUserToken } = require('../utils/token-generate');
const { PrismaClient } = require('@prisma/task/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const email = require('../service/email')

const blockedCountries = ['Syria', 'Afghanistan', 'Iran'];

const Register = asyncHandler(async (req, res) => {
  const values = req.body;

  if (!values.email || !values.password || !values.cpassword) {
    let error = new Error("All fields are mandatory.");
    error.status = 400;
    throw error;
  }

  if (values.password !== values.cpassword) {
    throw new Error("Passwords do not match");
  }

  const country = await getCountryFromIP(req.ip);

  if (blockedCountries.includes(country)) {
    return res.status(403).json({ message: 'Signup not allowed from this country' });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: values.email }
  });

  if (existingUser) {
    throw new Error("Email already exists!");
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const generateOTP = Math.floor(Math.random() * 9000000)
  await email.SendEmail(values.email, "Task Email", `Your OTP for verification is: ${generateOTP}`)

  let newUser = await prisma.user.create({
    data: {
      email: values.email,
      password: hashedPassword,
      country: country,
      otp: generateOTP.toString()
    }
  });
  const tokenRecord = generateUserToken(newUser.id)

  res.set('Authentication', tokenRecord);
  delete newUser.password
  newUser.token = tokenRecord
  return newUser

});

const Login = asyncHandler(async (req, res, next) => {

  const values = req.body;
  if (!values.email || !values.password) {
    let error = new Error("All fields are mandatory.");
    error.status = 400;
    throw error;
  }
  let existingUser = await prisma.user.findUnique({
    where: { email: values.email }
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!existingUser.isEMail) {
    const error = new Error("Email is not verified");
    error.status = 404;
    throw error;
  }

  const isPasswordMatched = await bcrypt.compare(values.password, existingUser.password);
  if (!isPasswordMatched) {
    let error = new Error("Password mismatch.");
    error.status = 400;
    throw error;
  }

  const tokenRecord = generateUserToken(existingUser.id)

  delete existingUser.password
  existingUser.token = tokenRecord
  return existingUser

});


const VerifyOtp = asyncHandler(async (req, res) => {
  const values = req.body;
  const user = req.user;

  if (!values.code) {
    const error = new Error("All fields are mandatory.");
    error.status = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email }
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (Number(existingUser.otp) !== values.code) {
    const error = new Error("OTP is Invalid");
    error.status = 409;
    throw error;
  }
  await prisma.user.update({
    where: { email: user.email },
    data: { isEMail: true }
  });
  return existingUser;
});

module.exports = {
  Register,
  Login,
  VerifyOtp,
}