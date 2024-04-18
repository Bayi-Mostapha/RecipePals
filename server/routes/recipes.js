import express from 'express'
import { getRecipes, getRecipe, createRecipe } from '../controllers/recipes.js'
const recipeRoutes = express.Router()

recipeRoutes.get('/', getRecipes)
recipeRoutes.get('/:id', getRecipe)
recipeRoutes.post('/', createRecipe)

export default recipeRoutes;