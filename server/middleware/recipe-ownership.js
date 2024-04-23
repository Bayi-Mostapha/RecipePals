import Recipe from "../models/recipe.js";

export default async function checkRecipeOwnership(req, res, next) {
    try {
        const recipeId = req.params.id;
        const userId = req.userId;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (recipe.creator.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
