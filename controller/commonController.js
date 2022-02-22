const uploadFile = require('../service/driveUpload')

module.exports.image_post = async (req,res) => {
    console.log('POST request received to /image-upload.');
    console.log('Axios POST body: ', req.name);
    const response = await uploadFile(req.name)
    console.log("Response : ",response.webContentLink)
    res.send('POST request received on server to /image-upload.');

    res.status(200).json("Done")
}