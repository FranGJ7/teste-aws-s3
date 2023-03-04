require("dotenv").config();

const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME; 
const region = process.env.AWS_BUCKET_REGION; 
const accessKeyId = process.env.AWS_ACCESS_KEY;  


const s3 = new S3({
    region,
    accessKeyId,
})

function uploadFile(file, fileName){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName 
    }

    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile