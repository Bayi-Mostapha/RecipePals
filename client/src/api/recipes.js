import axiosClient from "./axios";

export async function getRecipes() {
    return await axiosClient.get('http://localhost:5000/recipes')
}

export async function createRecipe(data) {
    return await axiosClient.post('http://127.0.0.1:5000/recipes/', data)
}

export async function getRecipe(id) {
    return await axiosClient.get('http://localhost:5000/recipes/' + id)
}

export async function updateRecipe(id, data) {
    return await axiosClient.put('http://localhost:5000/recipes/' + id, data)
}

export async function deleteRecipe(id) {
    return await axiosClient.delete('http://localhost:5000/recipes/' + id)
}