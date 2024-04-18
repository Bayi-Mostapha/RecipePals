import axios from "axios"
import { useEffect, useState } from "react"

// import { useForm } from "react-hook-form";
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().required(),
// });

function App() {
  const [recipes, setRecipes] = useState([])
  // const form = useForm({
  //   resolver: yupResolver(schema),
    // you can make defaultValues a function that returns an object with backend values
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   }
  // });
  // const { formState, handleSubmit, control } = form;
  // const { isSubmitting, isValid,isDirty } = formState;

  const getRecipes = async () => {
    const res = await axios.get('http://localhost:5000/recipes')
    setRecipes(res.data)
  }
  useEffect(() => {
    getRecipes()
  }, [])

  const displayRecipes = () => {
    return recipes.map(recipe =>
      <div key={recipe._id}>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <h4>ingredients</h4>
        <ul>
          {recipe.ingredients.map((ingredient, i) =>
            <li key={recipe._id + i}>{ingredient}</li>
          )}
        </ul>
        <h4>instructions</h4>
        <p>{recipe.instructions}</p>
      </div>
    );
  }
  return (
    <div>
      {displayRecipes()}

      {/* <form onSubmit={handleSubmit(submit)}></form> */}
    </div>
  )
}

export default App
