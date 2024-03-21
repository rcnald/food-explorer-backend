const { Router } = require("express")
const DishController = require("../controllers/dish.controller")
const dishRouter = Router()
const authenticationMiddleware = require("../middlewares/authenticationMiddleware")
const authorizationMiddleware = require("../middlewares/authorizationMiddleware")

const multer = require("multer")
const uploadConfigs = require("../configs/upload")
const upload = multer(uploadConfigs.MULTER)

const dishController = new DishController()

dishRouter.get('/', dishController.index)
dishRouter.get('/:id', dishController.show)

dishRouter.use(authenticationMiddleware)
dishRouter.use(authorizationMiddleware({ accessRole: ['admin'] }))

dishRouter.post('/', upload.single("photo"), dishController.create)
dishRouter.put('/:id/edit',upload.single("photo"), dishController.update)
dishRouter.delete('/delete/:id', dishController.delete)

module.exports = dishRouter