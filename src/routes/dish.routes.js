const { Router } = require("express")
const DishController = require("../controllers/dish.controller")
const dishRouter = Router()

const multer = require("multer")
const uploadConfigs = require("../configs/upload")
const upload = multer(uploadConfigs.MULTER)

const dishController = new DishController()

dishRouter.post('/', upload.single("photo"), dishController.create)

module.exports = dishRouter