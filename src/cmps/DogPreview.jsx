import { Link } from 'react-router-dom'

export function DogPreview({ dog }) {
    return <article className="preview">
        <header>
            <Link to={`/dog/${dog._id}`}>{dog.name}</Link>
        </header>

        <p>Age: <span>{dog.age.toLocaleString()} Y/O</span></p>
        
    </article>
}