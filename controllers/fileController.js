const fs = require("fs");
const crypto = require("crypto");
const until = require("until");
const unLinkFile = until.promisify(fs.unlink);
const {uploadFile} = require("../s3");

const fileController = {
    //POST /image
    uploadFile: async (req, res) =>{
        const file = req.file;
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash} - ${file.originalname}`

        const result = await uploadFile(file, fileName)
        await unLinkFile(file.path)
        res.send({ imagePath: `/image/${result.Key}`})
    },
};

exports.fileController = fileController;