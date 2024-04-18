import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import recipeRoutes from './routes/recipes.js'

const app = express();
const PORT = 5000;
const CONNECTION_URL = 'mongodb+srv://skw9izo6:y08VWK6R2DTWFOBx@recipe.eoevdbj.mongodb.net/?retryWrites=true&w=majority&appName=recipe';

mongoose.connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err)
  });

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use('/recipes', recipeRoutes)