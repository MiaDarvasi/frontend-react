
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'dog'

export const dogService = {
    query,
    getById,
    save,
    remove,
    addDogMsg
}
window.cs = dogService


async function query(filterBy = {}) {
    var dogs = await storageService.query(STORAGE_KEY)
    const {} = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     dogs = dogs.filter(dog => regex.test(dog.vendor) || regex.test(dog.description))
    // }
    // if (minSpeed) {
    //     dogs = dogs.filter(dog => dog.speed >= minSpeed)
    // }
    // if(sortField === 'vendor' || sortField === 'owner'){
    //     dogs.sort((dog1, dog2) => 
    //         dog1[sortField].localeCompare(dog2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     dogs.sort((dog1, dog2) => 
    //         (dog1[sortField] - dog2[sortField]) * +sortDir)
    // }
    
    dogs = dogs.map(({ _id, name }) => ({ _id, name }))
    return dogs
}

function getById(dogId) {
    return storageService.get(STORAGE_KEY, dogId)
}

async function remove(dogId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, dogId)
}

async function save(dog) {
    var savedDog
    if (dog._id) {
        const dogToSave = {
            _id: dog._id,
            price: dog.price,
            speed: dog.speed,
        }
        savedDog = await storageService.put(STORAGE_KEY, dogToSave)
    } else {
        const dogToSave = {
            vendor: dog.vendor,
            price: dog.price,
            speed: dog.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedDog = await storageService.post(STORAGE_KEY, dogToSave)
    }
    return savedDog
}

async function addDogMsg(dogId, txt) {
    // Later, this is all done by the backend
    const dog = await getById(dogId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    dog.msgs.push(msg)
    await storageService.put(STORAGE_KEY, dog)

    return msg
}