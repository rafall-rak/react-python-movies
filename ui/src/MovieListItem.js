export default function MovieListItem(props) {
    function showActorsList() {
        if (props.movie.actors) {
            return <row>
                <ul>
                    {props.movie.actors.map(actor => <li
                        key={actor.idx}>{actor.name} {actor.surname}</li>)}
                </ul>
            </row>
        }
    }

    function showDeleteButton() {
        if (props.onDelete) {
            return <a onClick={props.onDelete}>Delete</a>
        }
    }

    return (<div>
        <div>
            <strong>{props.movie.title}</strong>
            {' '}
            <span>({props.movie.year})</span>
            {' '}
            directed by {props.movie.director}
            {' '}
            {showDeleteButton()}
            {showActorsList()}
        </div>
        <div className="row">
            {props.movie.description}
        </div>
    </div>);
}
