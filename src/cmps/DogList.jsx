import { userService } from '../services/user'
import { DogPreview } from './DogPreview'

import trash from '../assets/imgs/icons/trash.svg'


export function DogList({ dogs, onRemoveDog, onUpdateDog }) {

    return <section>
        <ul className="list">
            {dogs.map(dog =>
                <li key={dog._id}>
                    <DogPreview dog={dog}/>
                    {/* <button onClick={() => onUpdateDog(dog)}>Edit</button> */}
                    <button onClick={() => onRemoveDog(dog._id)}><img src={trash}/></button>
                </li>)
            }
        </ul>
    </section>
}