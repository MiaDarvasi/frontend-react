import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'

import { loadDogs, addDog, updateDog, removeDog, addDogMsg } from '../store/actions/dog.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { dogService } from '../services/dog/'
import { userService } from '../services/user'

import { DogList } from '../cmps/DogList'
import { DogFilter } from '../cmps/DogFilter'
import { DogCounter } from "../cmps/DogCounter"

import plus from '../assets/imgs/icons/plus.svg'
import paw from '../assets/imgs/icons/paw_orange_full.svg'


export function HomePage() {

    const [filterBy, setFilterBy] = useState(dogService.getDefaultFilter())
    const dogs = useSelector(storeState => storeState.dogModule.dogs)
    console.log(dogs)

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
        if (age === 0 || age === dog.age) return

        const dogToSave = { ...dog, age }
        try {
            const savedDog = await updateDog(dogToSave)
            showSuccessMsg(`Dog updated, new speed: ${savedDog.age}`)
        } catch (err) {
            showErrorMsg('Cannot update dog')
        }
    }

    return (
        <section dir="rtl" className="home-page">
            <h1><img src={paw}/>פנסיון בהר</h1>
            <h2>ניהול ובקרת מידע על הכלבים שאצלנו בפנסיון</h2>
            <button className="add-btn"> <img src={plus} /> <span>הוספת כלב חדש</span></button>
            <DogCounter dogs={dogs} />
            <DogList
                dogs={dogs}
                onRemoveDog={onRemoveDog}
                onUpdateDog={onUpdateDog} />
        </section >

    )
}

