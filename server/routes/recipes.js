import express from 'express'
import auth from '../middleware/auth.js'
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js'
import checkRecipeOwnership from '../middleware/recipe-ownership.js'
const recipeRoutes = express.Router()

recipeRoutes.get('/', getRecipes)
recipeRoutes.get('/:id', getRecipe)
recipeRoutes.post('/', auth, createRecipe)
recipeRoutes.put('/:id', auth, checkRecipeOwnership, updateRecipe)
recipeRoutes.delete('/:id', auth, checkRecipeOwnership, deleteRecipe)

export default recipeRoutes;