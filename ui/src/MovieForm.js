import {useState} from "react";
import ActorForm from "./ActorForm";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState([]);

    function handleActorChange(providedActor) {
        console.log({before: actors});
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
        setActors([...actors, {
            idx: actorsCount, name: '', surname: ''
        }]);
    }

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        const mapped_actors = actors.map((actor) => ({name: actor.name, surname: actor.surname}))
        props.onMovieSubmit({
            title, year, director, description, actors: mapped_actors
        });
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActors([])
    }

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div className="row">
            <div className="column">
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <label>Director</label>
                <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
            </div>
            <div className="column">
                <label>Year</label>
                <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <label>Description</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
            </div>
        </div>
        <div className="row">
            <h3>Actors</h3>
            <button className="button button-clear" type="button" onClick={addActorFormItem}>Next actor</button>
        </div>
        <ActorForm handleActorChange={handleActorChange} actors={actors}/>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>
        ;
}
