import { API_URL } from "./constants";

async function getPokemon(route) {
    return get(route)
}

function getPokemonById(id) {
    return get(`pokemon/${id}`)
}

function sendAnswerToAPI(pokemonName, id) {
    const payload = {
        name: pokemonName
    }
    return post(payload, `pokemon/answer/${id}`)
}

async function post(payload, route) {
    return apiRequest("POST", route, payload)
}

async function get(route) {
    return apiRequest("GET", route)
}

async function apiRequest(method, route, data) {
    const request = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
    }
    if(method.toUpperCase() !== "GET") {
        request.body = JSON.stringify(data)
    }

    if(!route) {
        const response = await fetch(`${API_URL}`, request)
        return response.json()
    }

    const response = await fetch(`${API_URL}/${route}`, request)

    const res = response.json()

    return res
}

export {
    apiRequest,
    getPokemon,
    sendAnswerToAPI,
    getPokemonById
}