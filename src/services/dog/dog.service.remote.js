import { httpService } from '../http.service'

export const dogService = {
    query,
    getById,
    save,
    remove,
    addDogMsg
}

async function query(filterBy = {}) {
    return httpService.get(`dog`, filterBy)
} 

function getById(dogId) {
    return httpService.get(`dog/${dogId}`)
}

async function remove(dogId) {
    return httpService.delete(`dog/${dogId}`)
}

async function save(dog) {
    var savedDog
    if (dog._id) {
        savedDog = await httpService.put(`dog/${dog._id}`, dog)
    } else {
        savedDog = await httpService.post('dog', dog)
    }
    return savedDog
}

async function addDogMsg(dogId, txt) {
    const savedMsg = await httpService.post(`dog/${dogId}/msg`, {txt})
    return savedMsg
}