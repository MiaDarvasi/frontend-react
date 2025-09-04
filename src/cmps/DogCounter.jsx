import { useSelector } from 'react-redux'
import paw from '../assets/imgs/icons/paw_orange.svg'

export function DogCounter({ dogs }) {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <section className='dog-counter counter'>
            <section>
                <h1>סה״כ כלבים</h1>
                <p>{dogs.length}</p>
            </section>
            <img src={paw}/>
        </section>
    )
}