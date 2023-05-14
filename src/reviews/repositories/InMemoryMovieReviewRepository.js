import ReviewRepository from './Repository';

export default class extends ReviewRepository {

    constructor() {
        super();
        this.index = 1;
        this.data = {};
    }
    persist(reviewEntity) {
        const row = Object.assign({}, reviewEntity);
        const rowId = this.index++;
        row.id = rowId;
        this.data[rowId] = row;
        return row;
    }
    remove(userId) {
        delete this.data[userId];
        return Promise.resolve();
    }
    get(userId) {
        return Promise.resolve(this.data[userId]);
    }
    find() {
        return Promise.resolve(this.dataAsArray());
    }
    dataAsArray() {
        return Object.keys(this.data).map(key => this.data[key]);
    }

}
