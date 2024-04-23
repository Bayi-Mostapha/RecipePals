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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})
const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe