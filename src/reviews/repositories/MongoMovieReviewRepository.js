import MovieReview from '../entities/MovieReview';
import mongoose from 'mongoose';
import MovieRepository from './Repository';

export default class extends MovieRepository {

    constructor() {
        super();
        const movieSchema = new mongoose.Schema({
            movieId: Number,
            author: String,
            review: String
        });
        this.model = mongoose.model('Movie', movieSchema);
    }

    async persist(movieEntity) {
        const { movieId, author, review } = movieEntity;
        const result = new this.model({ movieId, author, review });
        await result.save();
        movieEntity.id = result.id;
        return movieEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const { id, movieId, author, review } = result;
        return new MovieReview(id, movieId, author, review);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new MovieReview(result.id, result.movieId, result.author, result.review);
        });
    }
}
