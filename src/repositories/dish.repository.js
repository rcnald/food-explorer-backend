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

  async deleteFile({ fileName }){
    const diskStorage = new DiskStorage()
    
    await diskStorage.deleteFile(fileName)
  }

  async getDish({ id }){
    const [ dish ] = await knex('dishes').where({ id })

    const ingredients = await knex('ingredients').select(['name', 'id']).where('dish_id', id)
      
    return { ...dish, ingredients }
  }

  async updateDish({ id, photo, name, description, category, price }){
    await knex('dishes')
      .where({ id })
      .update({ photo, name, description, category, price })

  }

  async deleteIngredients({ dish_id }){
    await knex('ingredients').where({ dish_id }).del()
  }

  async getDishes({ category, query }){
    let dishes 

    dishes = await knex('ingredients')
      .distinct('dishes.id')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price',
        'dishes.photo'
      ])
      .where({ category })
      .whereLike('ingredients.name', `%${query}%`)
      .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')

    if(!dishes.length){
      dishes = await knex('dishes')
        .where({ category })
        .whereLike('name', `%${query}%`)
    }

    return dishes
  }
}

module.exports = UserRepository