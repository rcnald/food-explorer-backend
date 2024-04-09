const DishService = require("../services/dish.service")
const DishRepository = require("../repositories/dish.repository")

const dishRepository = new DishRepository()
const dishService = new DishService(dishRepository)

class dishController {
  async create(req, res) {
    const { name, category, ingredients, price, description } = req.body
    const photo = req.file?.filename

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

  async update(req, res){
    const { name, description, category, ingredients, price } = req.body
    const photo = req.file?.filename
    const { id } = req.params

    await dishService.update({ 
      id, 
      photo, 
      name, 
      description, 
      category, 
      ingredients, 
      price
    })

    return res.status(200).json({
      status:"success",
      message:"Prato atualizado com sucesso!",
    })
  }

  async show(req, res){
    const { id } = req.params

    const dish = await dishService.show({ id })

    return res.status(200).json({ dish })
  }

  async delete(req, res){
    const { id } = req.params

    await dishService.delete({ id })

    return res.status(200).json({ 
      status:"success",
      message:"Prato excluído com sucesso!",
     })
  }

  async index(req, res){
    const { category, query } = req.query

    const dishes = await dishService.index({ category, query })

    return res.status(200).json({ dishes })
  }
}

module.exports = dishController