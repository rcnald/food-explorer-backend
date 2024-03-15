const knex = require("../database/knex")
const DiskStorage = require("../providers/diskStorage")

class UserRepository {
  async createDish({ photo, name, category, price, description }){
    const [ id ] = await knex('dishes').insert({ photo, name, category, price, description });

    return { id }
  }

  async createIngredients ({ ingredients, dish_id }){
    const ingredientsArray = ingredients.split(",")
  
    const ingredientsToInsert = ingredientsArray.map(ingredient => {
      return {
        dish_id,
        name: ingredient
      }
    })

    await knex("ingredients").insert(ingredientsToInsert)
  }

  async saveFile({ fileName }){
    const diskStorage = new DiskStorage()
    
    await diskStorage.saveFile(fileName)
  }
}

module.exports = UserRepository