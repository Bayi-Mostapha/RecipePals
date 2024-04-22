import mongoose from 'mongoose';
import Recipe from '../models/recipe.js';
import { isIdValid } from '../functions/validators.js';

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isIdValid(id)) {
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
    if (!req.userId) {
        return res.status(401).json({ message: 'unauthenticated' })
    }
    const userRecipe = req.body
    try {
        const recipe = new Recipe(userRecipe);
        recipe.save()
        res.status(201).json(recipe);
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};

export const updateRecipe = async (req, res) => {
    const id = req.params.id;
    const userRecipe = req.body
    try {
        if (!isIdValid(id)) {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            userRecipe,
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteRecipe = async (req, res) => {
    const id = req.params.id;
    try {
        if (!isIdValid(id)) {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }
        const recipe = await Recipe.findByIdAndDelete(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};