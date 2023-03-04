const express = require("express");
const { fileController } = require("./controllers/fileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

