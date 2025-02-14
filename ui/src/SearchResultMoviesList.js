import MovieListItem from "./MovieListItem";

export default function SearchResultMoviesList(props) {
    return <div>
        <ul className="movies-list">
            {props.movies.map(movie => <li key={movie.title}>
                <MovieListItem movie={movie}/>
            </li>)}
        </ul>
    </div>;
}
