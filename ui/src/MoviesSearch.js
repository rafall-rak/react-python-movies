import {useState} from "react";
import SearchResultMoviesList from "./SearchResultMoviesList";

export default function MoviesSearch(props) {
    const [searchQuery, setSearchQuery] = useState('');

    function onSearch(event) {
        event.preventDefault();
        if (searchQuery.length < 5) {
            return alert('Search query length is too short');
        }

        props.onSearch(searchQuery);
    }

    return <form onSubmit={onSearch}>
        <h2>Try using semantic search</h2>
        <div className="row">
            <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
        </div>
        <div className="row">
            <button>Submit</button>
        </div>
        <SearchResultMoviesList movies={props.searchResultMovies}/>
    </form>
}