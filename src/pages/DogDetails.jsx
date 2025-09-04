import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadDog, addDogMsg } from '../store/actions/dog.actions'


export function DogDetails() {

  const {dogId} = useParams()
  const dog = useSelector(storeState => storeState.dogModule.dog)

  useEffect(() => {
    loadDog(dogId)
  }, [dogId])

  async function onAddDogMsg(dogId) {
    try {
        await addDogMsg(dogId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Dog msg added`)
    } catch (err) {
        showErrorMsg('Cannot add dog msg')
    }        

}

  return (
    <section className="dog-details">
      <Link to="/dog">Back to list</Link>
      <h1>Dog Details</h1>
      {dog && <div>
        <h3>{dog.vendor}</h3>
        <h4>${dog.price}</h4>
        <pre> {JSON.stringify(dog, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddDogMsg(dog._id) }}>Add dog msg</button>

    </section>
  )
}