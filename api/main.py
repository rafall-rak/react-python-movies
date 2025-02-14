from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import models
import schemas
from search_service import SearchService

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static",
                                 check_dir=False), name="static")
search_service = SearchService()


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")


@app.get("/movies", response_model=List[schemas.Movie])
def get_movies(search_query: str = None, limit: int = 3):
    if search_query:
        movie_ids = search_service.search_movies(search_query, limit)
        return list(models.Movie.filter(models.Movie.id << movie_ids).execute())
    return list(models.Movie.select())


@app.post("/movies", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieCreate):
    new_movie = models.Movie.create(
        title=movie.title,
        director=movie.director,
        year=movie.year,
        description=movie.description,
    )

    filtered_actors = [actor for actor in movie.actors if actor.name and actor.surname]
    persisted_actors = []
    for actor in filtered_actors:
        persisted_actor, created = models.Actor.get_or_create(name=actor.name, surname=actor.surname)
        persisted_actors.append(persisted_actor)

    new_movie.actors = persisted_actors
    models.Movie.update(actors=new_movie.actors).where(
        models.Movie.id == new_movie.id
    )

    embedding_id = search_service.index_movie(new_movie)
    models.Movie.update(embedding_id=embedding_id).where(
        models.Movie.id == new_movie.id).execute()

    return new_movie


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie


@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def delete_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db_movie.delete_instance()
    if db_movie.embedding_id:
        search_service.delete_movie(db_movie)
    return db_movie
