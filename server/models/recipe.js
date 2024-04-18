import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: String,
})
const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe