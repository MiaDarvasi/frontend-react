import { Link } from 'react-router-dom'

import paw from '../assets/imgs/icons/paw_white_full.svg'


export function DogPreview({ dog }) {

    console.log(dog.breed)

    return <article className="preview">

        <header>
            <div className='img-container'>
                <img src={paw} />
            </div>
            <section>
                <h1>{dog.name}</h1>
                <p>{dog.breed ? dog.breed : dog.gender === 'נקבה' ? 'מעורבת' : 'מעורב'}</p>
            </section>
        </header>
        <section className='dog-details'>
            <p><span>גיל: </span>{dog.age.toLocaleString()}</p>
            <p><span>פרטי בעלים: </span>{dog.ownerName} {dog.ownerPhone}</p>
        </section>


    </article>
}