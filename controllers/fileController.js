const fs = require("fs");  
const crypto = require("crypto");
const util = require("util");
const unLinkFile = util.promisify(fs.unlink);
const {uploadFile, getAllFiles, getAllStream } = require("../s3");

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

    //GET IMAGES
    getImages: async (req, res) =>{
        const contents = await getAllFiles();
        return res.json(contents.map((content) => content.Key))
    },

    //GET /images/:key
   getImageByKey: (req, res)=>{
        const key = req.params.key 
        const readStream = getAllStream(key)

        readStream.pipe(res)
   }

};

exports.fileController = fileController;