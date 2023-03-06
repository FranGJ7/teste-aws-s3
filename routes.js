const express = require("express");  
const { fileController } = require("./controllers/fileController");
const multer = require("multer"); 
const upload = multer({ dest: "uploads/" });

const router = express.Router(); 


router.post("/image", upload.single("image"), fileController.uploadFile);

router.get("/image", fileController.getImages)

router.get("/image/:key", fileController.getImageByKey)



module.exports = router;