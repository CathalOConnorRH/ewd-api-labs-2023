import Genre from '../entities/Genre';
import mongoose from 'mongoose';
import GenreRepository from './Repository';

export default class extends GenreRepository {

    constructor() {
        super();
        const genresSchema = new mongoose.Schema({
            name: String
        });
        this.model = mongoose.model('Genre', genresSchema);
    }

    async persist(genreEntity) {
        const {name} = genreEntity;
        const result = new this.model({name});
        await result.save();
        genreEntity.id=result.id;
        return genreEntity;
    }

    async remove(genreId) {
        return this.model.findOneAndDelete(genreId);
    }

    async get(genreId) {
        const result = await this.model.findById(genreId);
        const {id, name } = result;
        return new Genre(id, name );
    }

    async find() {
        const genres = await this.model.find();
        return genres.map((result) => {
            return new Genre(result.id, result.name);
        });
    }
}
