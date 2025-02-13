import { useState } from "react";
import ActorForm from "./ActorForm";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState([]);

    function handleActorChange(providedActor) {
        console.log({ before: actors });
        var newObj = [...actors].map((actor) => {
            if (actor.idx === providedActor.idx) {
                return providedActor
            } else {
                return actor;
            }
        })
        setActors(newObj);
    }

    function addActorFormItem() {
        const actorsCount = actors.length;
        setActors([
            ...actors,
            {
                idx: actorsCount,
                firstName: '',
                lastName: ''
            }
        ]);
    }

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        props.onMovieSubmit({ title, year, director, description });
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActors([])
    }

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)} />
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)} />
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <h3>Actors</h3>
        <div className="row">
            <button className="button button-clear" type="button" onClick={addActorFormItem}>Next actor</button>
        </div>
        <ActorForm addActorFormItem={addActorFormItem} handleActorChange={handleActorChange} actors={actors} />
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
