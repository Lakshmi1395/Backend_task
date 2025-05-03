//email by smpt

const nodemailer = require('nodemailer');
const { config } = require('../config/constants')

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: config.SMPT_EMAILUSER,
    pass: config.SMPT_EMAILPASSWORD
  }
});


async function SendEmail(toemail, subject, text) {
  return new Promise((resolve, reject) => {
    setImmediate(async () => {
      try {
        const mailOptions = {
          from: config.FROM_MAIL,
          to: toemail,
          subject: subject,
          text: text
        };
        //let emailTransporter = await transporter()
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject({
              code: 201,
              success: false,
              status: error.stack,
              timestamp: new Date()
            });
          } else {
            console.log('Email sent:', info.response);
            resolve({
              code: 200,
              success: true,
              status: info.response,
              timestamp: new Date()
            })
          }
        });
      } catch (err) {
        reject({
          code: 201,
          message: err.stack
        })
      }
    })
  })
}


module.exports = {
  SendEmail
}