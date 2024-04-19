import express from 'express'
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js'
const recipeRoutes = express.Router()

recipeRoutes.get('/', getRecipes)
recipeRoutes.get('/:id', getRecipe)
recipeRoutes.post('/', createRecipe)
recipeRoutes.put('/:id', updateRecipe)
recipeRoutes.delete('/:id', deleteRecipe)

export default recipeRoutes;