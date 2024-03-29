const { ClientError } = require("../lib/utils")

class DishService{
  constructor(repository){
    this.repository = repository
  }

  async create({ photo, name, category, ingredients, price, description  }){
    if (!photo || !name || !category || !price || !description) {
      throw new ClientError(
        "Photo, name, category, price, ou description estão vazias!"
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

  async update({ id, photo, name, description, category, ingredients, price }){
    if (!name || !photo || !category || !price || !description) {
      throw new ClientError(
        "Name, category, price, ou description estão vazias!"
      );
    }

    const dish  = await this.repository.getDish({ id })

    if(!dish){
      throw new ClientError("Prato não encontrado!", 404);
    }

    if(photo){
      await this.repository.deleteFile({ fileName: dish.photo })
      await this.repository.saveFile({ fileName: photo })
    }

    await this.repository.updateDish({ 
      id, 
      name, 
      description, 
      photo,
      category, 
      price 
    })

    if(ingredients){
      await this.repository.deleteIngredients({ dish_id: id })
      await this.repository.createIngredients({ dish_id: id, ingredients })
    }
  }

  async show({ id }){
    const dish = await this.repository.getDish({ id })

    if(!dish){
      throw new ClientError("Prato não encontrado!", 404);
    }

    return dish
  }

  async delete({ id }){
    const dish = await this.repository.getDish({ id })

    console.log(dish)

    if(!dish){
      throw new ClientError("Prato não encontrado!", 404);
    }

    await this.repository.deleteDish({ id })
  }

  async index({ category, query, ingredients }){
    const dishes = await this.repository.getDishes({ category, query, ingredients })

    if(!dishes.length){
      throw new ClientError("Pratos não encontrados!", 404);
    }

    return dishes
  }
}

module.exports = DishService