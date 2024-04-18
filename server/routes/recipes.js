import express from 'express'
import { getRecipes, createRecipe } from '../controllers/recipes.js'
const recipeRoutes = express.Router()

recipeRoutes.get('/', getRecipes)
recipeRoutes.post('/', createRecipe)

export default recipeRoutes;