import TVShowReview from '../entities/TVShowReview';
import mongoose from 'mongoose';
import TVShowRepository from './Repository';

export default class extends TVShowRepository {

    constructor() {
        super();
        const tvShowSchema = new mongoose.Schema({
            tvShowId: Number,
            author: String,
            review: String
        });
        this.model = mongoose.model('TVShow', tvShowSchema);
    }

    async persist(tvShowEntity) {
        const { tvShowId, author, review } = tvShowEntity;
        const result = new this.model({ tvShowId, author, review });
        await result.save();
        tvShowEntity.id = result.id;
        return tvShowEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const { id, tvShowId, author, review } = result;
        return new TVShowReview(id, tvShowId, author, review);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new TVShowReview(result.id, result.tvShowId, result.author, result.review);
        });
    }
}
