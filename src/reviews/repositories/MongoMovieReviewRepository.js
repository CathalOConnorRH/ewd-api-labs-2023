import MovieReview from '../entities/MovieReview';
import mongoose from 'mongoose';
import MovieRepository from './Repository';

export default class extends MovieRepository {

    constructor() {
        super();
        const movieSchema = new mongoose.Schema({
            movieId: String,
            author: String,
            content: String
        });
        this.model = mongoose.model('Movie', movieSchema);
    }

    async persist(movieEntity) {
        const { movieId, author, content } = movieEntity;
        const result = new this.model({ movieId, author, content });
        await result.save();
        movieEntity.id = result.id;
        return movieEntity;
    }

    async get(movieId) {
        const reviews = await this.model.find();
        const reviews2 = reviews.filter(review => review.movieId == movieId).map(
            filteredReview => { return new MovieReview(filteredReview.id, filteredReview.movieId, filteredReview.author, filteredReview.content); }
        );
        return reviews2;
    }
}
