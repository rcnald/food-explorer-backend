const { ClientError } = require("../lib/utils")

class DishService{
  constructor(repository){
    this.repository = repository
  }

  async create({ photo, name, category, ingredients, price, description  }){
    if (!photo || !name || !category || !price || !description) {
      throw new ClientError(
        "Avatar, name, category, price, ou description estão vazias!"
      );
    }

    const { id } = await this.repository.createDish({ 
      photo, 
      name, 
      category, 
      price, 
      description 
    })

    await this.repository.saveFile({ fileName: photo })

    if(ingredients){
      await this.repository.createIngredients({ dish_id: id, ingredients })
    }
  }
}

module.exports = DishService