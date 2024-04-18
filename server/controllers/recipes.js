import mongoose from 'mongoose';
import Recipe from '../models/recipe.js'

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

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