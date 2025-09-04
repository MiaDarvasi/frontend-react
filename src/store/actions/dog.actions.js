import { dogService } from '../../services/dog'
import { store } from '../store'
import { ADD_DOG, REMOVE_DOG, SET_DOGS, SET_DOG, UPDATE_DOG, ADD_DOG_MSG } from '../reducers/dog.reducer'

export async function loadDogs(filterBy) {
    try {
        const dogs = await dogService.query(filterBy)
        store.dispatch(getCmdSetDogs(dogs))
    } catch (err) {
        console.log('Cannot load dogs', err)
        throw err
    }
}

export async function loadDog(dogId) {
    try {
        const dog = await dogService.getById(dogId)
        store.dispatch(getCmdSetDog(dog))
    } catch (err) {
        console.log('Cannot load dog', err)
        throw err
    }
}


export async function removeDog(dogId) {
    try {
        await dogService.remove(dogId)
        store.dispatch(getCmdRemoveDog(dogId))
    } catch (err) {
        console.log('Cannot remove dog', err)
        throw err
    }
}

export async function addDog(dog) {
    try {
        const savedDog = await dogService.save(dog)
        store.dispatch(getCmdAddDog(savedDog))
        return savedDog
    } catch (err) {
        console.log('Cannot add dog', err)
        throw err
    }
}

export async function updateDog(dog) {
    try {
        const savedDog = await dogService.save(dog)
        store.dispatch(getCmdUpdateDog(savedDog))
        return savedDog
    } catch (err) {
        console.log('Cannot save dog', err)
        throw err
    }
}

export async function addDogMsg(dogId, txt) {
    try {
        const msg = await dogService.addDogMsg(dogId, txt)
        store.dispatch(getCmdAddDogMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add dog msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetDogs(dogs) {
    return {
        type: SET_DOGS,
        dogs
    }
}
function getCmdSetDog(dog) {
    return {
        type: SET_DOG,
        dog
    }
}
function getCmdRemoveDog(dogId) {
    return {
        type: REMOVE_DOG,
        dogId
    }
}
function getCmdAddDog(dog) {
    return {
        type: ADD_DOG,
        dog
    }
}
function getCmdUpdateDog(dog) {
    return {
        type: UPDATE_DOG,
        dog
    }
}
function getCmdAddDogMsg(msg) {
    return {
        type: ADD_DOG_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadDogs()
    await addDog(dogService.getEmptyDog())
    await updateDog({
        _id: 'm1oC7',
        title: 'Dog-Good',
    })
    await removeDog('m1oC7')
    // TODO unit test addDogMsg
}
