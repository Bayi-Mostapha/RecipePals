import axiosClient from "./axios";

export function getRecipes() {
    return axiosClient.get('/recipes')
}

export function createRecipe(data) {
    return axiosClient.post('/recipes/', data)
}

export function getRecipe(id) {
    return axiosClient.get('/recipes/' + id)
}

export function updateRecipe(id, data) {
    return axiosClient.put('/recipes/' + id, data)
}

export function deleteRecipe(id) {
    return axiosClient.delete('/recipes/' + id)
}