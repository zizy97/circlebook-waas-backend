const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const mime = require('mime-types')
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID_DRIVE,
  process.env.CLIENT_SECRET_DRIVE,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN_DRIVE });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function uploadFile(filename) {
  const filePath = path.join("./uploads", filename);
  const mimeType = mime.lookup(filename)
  console.log(mimeType)
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimeType,
      },  
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
    const res = await generatePublicUrl(response.data.id)
    return res
  } catch (error) {
    console.log(error.message);
  }
}

async function generatePublicUrl(fileId){
  try {
    await drive.permissions.create({
      fileId : fileId,
      requestBody : {
        role : 'reader',
        type : 'anyone'
      }
    })

    const result = await drive.files.get({
      fileId : fileId,
      fields : 'webViewLink,webContentLink'
    })
    // console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error.message)
  }
} 

module.exports = uploadFile;
