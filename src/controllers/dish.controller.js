const DishService = require("../services/dish.service")
const DishRepository = require("../repositories/dish.repository")

const dishRepository = new DishRepository()
const dishService = new DishService(dishRepository)

class dishController {
  async create(req, res) {
    const { name, category, ingredients, price, description } = req.body
    const photo = req.file.filename

    await dishService.create({ 
      photo, 
      name, 
      category, 
      ingredients, 
      price, 
      description 
    })

    return res.status(201).json({
      status:"success",
      message:"Prato criado com sucesso!",
    })
  }
}

module.exports = dishController