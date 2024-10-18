import { API_URL, THIRD_PARTY_API_URL } from "./constants";

async function getPokemon(route) {
    return thirdPartyAPIReq(route)
}

async function apiRequest(method, data, route) {
    const request = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
    }
    if(method.toUpperCase() !== "GET") {
        request.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_URL}/${route}`, request)
    
    return response.json()
}

async function thirdPartyAPIReq(route) {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if(!route) {
        const response = await fetch(`${THIRD_PARTY_API_URL}`, request)
        return response.json()
    }
    const response = await fetch(`${route}`, request)
    
    return response.json()
}

export {
    apiRequest,
    thirdPartyAPIReq,
    getPokemon
}