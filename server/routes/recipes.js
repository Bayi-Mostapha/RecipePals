import express from 'express'
import auth from '../middleware/auth.js'
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js'
const recipeRoutes = express.Router()

recipeRoutes.get('/', getRecipes)
recipeRoutes.get('/:id', getRecipe)
recipeRoutes.post('/', auth, createRecipe)
recipeRoutes.put('/:id', auth, updateRecipe)
recipeRoutes.delete('/:id', auth, deleteRecipe)

export default recipeRoutes;