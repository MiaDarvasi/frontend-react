import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadDogs, addDog, updateDog, removeDog, addDogMsg } from '../store/actions/dog.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { dogService } from '../services/dog/'
import { userService } from '../services/user'

import { DogList } from '../cmps/DogList'
import { DogFilter } from '../cmps/DogFilter'

export function DogIndex() {

    const [ filterBy, setFilterBy ] = useState(dogService.getDefaultFilter())
    const dogs = useSelector(storeState => storeState.dogModule.dogs)

    useEffect(() => {
        loadDogs(filterBy)
    }, [filterBy])

    async function onRemoveDog(dogId) {
        try {
            await removeDog(dogId)
            showSuccessMsg('Dog removed')            
        } catch (err) {
            showErrorMsg('Cannot remove dog')
        }
    }

    async function onAddDog() {
        const dog = dogService.getEmptyDog()
        dog.age = prompt('Age?')
        try {
            const savedDog = await addDog(dog)
            showSuccessMsg(`Dog added (id: ${savedDog._id})`)
        } catch (err) {
            showErrorMsg('Cannot add dog')
        }        
    }

    async function onUpdateDog(dog) {
        const age = +prompt('New age?', dog.age)
        if(age === 0 || age === dog.age) return

        const dogToSave = { ...dog, age }
        try {
            const savedDog = await updateDog(dogToSave)
            showSuccessMsg(`Dog updated, new speed: ${savedDog.age}`)
        } catch (err) {
            showErrorMsg('Cannot update dog')
        }        
    }

    return (
        <main className="dog-index">
            <header>
                <h2>Dogs</h2>
                {userService.getLoggedinUser() && <button onClick={onAddDog}>Add a Dog</button>}
            </header>
            <DogFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <DogList 
                dogs={dogs}
                onRemoveDog={onRemoveDog} 
                onUpdateDog={onUpdateDog}/>
        </main>
    )
}