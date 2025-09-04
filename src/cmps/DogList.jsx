import { userService } from '../services/user'
import { DogPreview } from './DogPreview'

export function DogList({ dogs, onRemoveDog, onUpdateDog }) {
    
    function shouldShowActionBtns(dog) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return dog.owner?._id === user._id
    }

    return <section>
        <ul className="list">
            {dogs.map(dog =>
                <li key={dog._id}>
                    <DogPreview dog={dog}/>
                    {shouldShowActionBtns(dog) && <div className="actions">
                        <button onClick={() => onUpdateDog(dog)}>Edit</button>
                        <button onClick={() => onRemoveDog(dog._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}