import { useState } from "react"
import { addDog } from "../store/actions/dog.actions"
import { dogService } from "../services/dog"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"

import paw from '../assets/imgs/icons/paw_orange_full.svg'

export function AddDog() {
  const [dog, setDog] = useState(dogService.getEmptyDog())

  function handleChange(ev) {
    const { name, value } = ev.target
    setDog(prev => ({ ...prev, [name]: value }))
  }

  async function onAddDog(ev) {
    ev.preventDefault()
    try {
      const savedDog = await addDog(dog)
      console.log(savedDog)
      showSuccessMsg(`${savedDog.name} ✅`)
      setDog(dogService.getEmptyDog())
    } catch (err) {
      showErrorMsg("שגיאה בהוספת כלב")
    }
  }

  return (
    <section className="add-dog" dir="rtl">
      <h1><img src={paw}/>כלב חדש</h1>

      <form onSubmit={onAddDog} className="dog-form">
        <label>
          שם הכלב:
          <input
            type="text"
            name="name"
            value={dog.name || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          גיל:
          <input
            type="number"
            name="age"
            value={dog.age || 0}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          שם הבעלים:
          <input
            type="text"
            name="ownerName"
            value={dog.ownerName || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          טלפון בעלים:
          <input
            type="tel"
            name="ownerPhone"
            value={dog.ownerPhone || ""}
            onChange={handleChange}
          />
        </label>

        <button type="submit">שמור כלב</button>
      </form>
    </section>
  )
}
