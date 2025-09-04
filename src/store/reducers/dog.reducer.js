export const SET_DOGS = 'SET_DOGS'
export const SET_DOG = 'SET_DOG'
export const REMOVE_DOG = 'REMOVE_DOG'
export const ADD_DOG = 'ADD_DOG'
export const UPDATE_DOG = 'UPDATE_DOG'
export const ADD_DOG_MSG = 'ADD_DOG_MSG'

const initialState = {
    dogs: [],
    dog: null
}

export function dogReducer(state = initialState, action) {
    var newState = state
    var dogs
    switch (action.type) {
        case SET_DOGS:
            newState = { ...state, dogs: action.dogs }
            break
        case SET_DOG:
            newState = { ...state, dog: action.dog }
            break
        case REMOVE_DOG:
            const lastRemovedDog = state.dogs.find(dog => dog._id === action.dogId)
            dogs = state.dogs.filter(dog => dog._id !== action.dogId)
            newState = { ...state, dogs, lastRemovedDog }
            break
        case ADD_DOG:
            newState = { ...state, dogs: [...state.dogs, action.dog] }
            break
        case UPDATE_DOG:
            dogs = state.dogs.map(dog => (dog._id === action.dog._id) ? action.dog : dog)
            newState = { ...state, dogs }
            break
        case ADD_DOG_MSG:
            newState = { ...state, dog: { ...state.dog, msgs: [...state.dog.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const dog1 = { _id: 'b101', vendor: 'Dog ' + parseInt(Math.random() * 10), msgs: [] }
    const dog2 = { _id: 'b102', vendor: 'Dog ' + parseInt(Math.random() * 10), msgs: [] }

    state = dogReducer(state, { type: SET_DOGS, dogs: [dog1] })
    console.log('After SET_DOGS:', state)

    state = dogReducer(state, { type: ADD_DOG, dog: dog2 })
    console.log('After ADD_DOG:', state)

    state = dogReducer(state, { type: UPDATE_DOG, dog: { ...dog2, vendor: 'Good' } })
    console.log('After UPDATE_DOG:', state)

    state = dogReducer(state, { type: REMOVE_DOG, dogId: dog2._id })
    console.log('After REMOVE_DOG:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = dogReducer(state, { type: ADD_DOG_MSG, dogId: dog1._id, msg })
    console.log('After ADD_DOG_MSG:', state)

    state = dogReducer(state, { type: REMOVE_DOG, dogId: dog1._id })
    console.log('After REMOVE_DOG:', state)
}

