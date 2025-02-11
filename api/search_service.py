import uuid
import spacy
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, PointIdsList
from qdrant_client.http.models import Distance, VectorParams

from models import Movie


class SearchService:
    COLLECTION_NAME = "movies"

    def __init__(self):
        self.nlp = spacy.load("pl_core_news_lg")
        self.qdrant_client = QdrantClient(host="localhost", port=6333)

        if not self.qdrant_client.collection_exists(self.COLLECTION_NAME):
            self.qdrant_client.create_collection(
                collection_name=self.COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=300, distance=Distance.COSINE),
            )

    def index_movie(self, movie: Movie) -> str:
        """
        Indexes movies by title as embedding vectors

        Returns: embedding_id: str
        """
        doc = self.nlp(movie.title+" "+movie.director+" "+movie.description)
        embedding_id = uuid.uuid4().hex
        self.qdrant_client.upsert(
            collection_name=self.COLLECTION_NAME,
            wait=True,
            points=[
                PointStruct(id=embedding_id, vector=doc.vector, payload={"movie": {
                    "title": movie.title,
                    "id": movie.id
                }})
            ],
        )

        return embedding_id

    def delete_movie(self, movie: Movie):
        """
        Deletes movie from index
        """
        self.qdrant_client.delete(
            collection_name=self.COLLECTION_NAME,
            points_selector=PointsIdList(
                points=[movie.embedding_id],
            )
        )
