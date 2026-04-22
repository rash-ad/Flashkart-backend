class Paginate {
    constructor(page, limit) {
        this.page = parseInt(page, 10) || 1;
        this.limit = parseInt(limit, 10) || 10;
        this.skip = (this.page - 1) * this.limit;
    }

    getPagination() {
        return {
            page: this.page,
            limit: this.limit,
            skip: this.skip,
        };
    }
}

export default Paginate;
