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

  async index(req, res){
    const { category, query, ingredients } = req.query

    const dishes = await dishService.index({ category, query, ingredients })

    return res.status(200).json({ dishes })
  }
}

module.exports = dishController