import TVShowReview from '../entities/TVShowReview';
import mongoose from 'mongoose';
import TVShowRepository from './Repository';
import logger from '../../utils/Winston';

export default class extends TVShowRepository {

    constructor() {
        super();
        const tvShowSchema = new mongoose.Schema({
            tvShowId: String,
            author: String,
            content: String,

        });
        this.model = mongoose.model('TVShow', tvShowSchema);
    }

    async persist(tvShowEntity) {
        const { tvShowId, author, content } = tvShowEntity;
        const result = new this.model({ tvShowId, author, content });
        await result.save();
        tvShowEntity.id = result.id;
        return tvShowEntity;
    }

    // async remove(userId) {
    //     return this.model.findOneAndDelete(userId);
    // }

    async get(reviewId) {
        const reviews = await this.model.find();
        const reviews2 = reviews.filter(review => review.tvShowId == reviewId).map(
            filteredReview => { return new TVShowReview(filteredReview.id, filteredReview.tvShowId, filteredReview.author, filteredReview.content); }
        );
        return reviews2;
    }

    // async find() {
    //     const accounts = await this.model.find();
    //     return accounts.map((result) => {
    //         return new TVShowReview(result.id, result.tvShowId, result.author, result.review);
    //     });
    // }
}
