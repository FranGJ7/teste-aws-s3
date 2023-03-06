require("dotenv").config();
const fs = require("fs");
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_KEY_ACESS,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.AWS_BUCKET_REGION
});

const bucketName = process.env.AWS_BUCKET_NAME;




//Função de upload de imagem para bucket

function uploadFile(file, fileName) {
    const fileStream = fs.createReadStream(file.path)
    const bucketName = process.env.AWS_BUCKET_NAME;

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName
    }

    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile





//Obtendo todo conteudo dentro do bucket

function getAllFiles() {
    return new Promise((resolve, reject) => {
        s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Contents)
            }
        })
    })
}

exports.getAllFiles = getAllFiles






//Obtendo apenas um item do bucket
function getAllStream(fileKey) {
    const downloadParams = {
        Bucket: bucketName,
        Key: fileKey
    }

    return s3.getObject(downloadParams).createReadStream();
}

exports.getAllStream = getAllStream