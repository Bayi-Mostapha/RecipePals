import Recipe from '../models/recipe.js'

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createRecipe = async (req, res) => {
    const userRecipe = req.body
    try {
        const recipe = new Recipe(userRecipe);
        recipe.save()
        res.status(201).json(recipe);
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
}