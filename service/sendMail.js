const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID_MAIL,
  process.env.CLIENT_SECRET_MAIL,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN_MAIL });

async function sendMail(emailAdd,fname) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const trasport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "circlebook_waas_services@gmail.com",
        clientId: process.env.CLIENT_ID_MAIL,
        clientSecret:  process.env.CLIENT_SECRET_MAIL,
        refreshToken: process.env.REFRESH_TOKEN_MAIL,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Ciclebook 💇 <circlebook_waas_services@gmail.com>",
      to: emailAdd,
      subject: "Welcome to Circlebook!",
      text: "Welcome to Circlebook!",
      html: `<html>
            <head>
            <style>

                .divOut{
                    background-color:#eef2f3;
                    padding:20px 40px;
                    border-radius:15px;
                    font-family:'Tahoma';
                    text-align:center;
                }
                </style>
                </head>
                <body >
                <div class="divOut">
                <h1 style="font-family:'Tahoma';color:#001e62">Hi ${fname}</h1>

                <h3 style="color:#6a82fb">Welcome to Circlebook!</h3>
                <p style="color:#001e62">We are so glad you chose Circlebook.We are here to help you for managing your services.</p>
                <p style="color: #fc5c7d;">Go back to Circlebook <a href="https://circlebook.site/">Log In.</a></p>
                </div>
            </body>
            </html>`,
    };

    const result = await trasport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { sendMail };
