import { API_URL, THIRD_PARTY_API_URL } from "./constants";

async function getPokemon() {
    return thirdPartyAPIReq()
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

async function thirdPartyAPIReq() {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${THIRD_PARTY_API_URL}`, request)
    return response.json()
}

export {
    apiRequest,
    thirdPartyAPIReq,
    getPokemon
}