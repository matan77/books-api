const Book = require('../models/book');
const { getAuthorByCountry } = require('../services/authors');

module.exports = {
    getAllBooks: async (page) => {
        try {
            const allBooks = await Book.find({}).skip(page * 10).limit(10);
            return allBooks.map(b => ({
                id: b._id,
                title: b.title,
                publishingYear: b.publishingYear,
                genres: b.genres,
                authors: b.authors,
                quantity: b.quantity,
                price: b.price
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBooksByName: async (name, page) => {
        try {
            const books = await Book.find({ title: { $regex: name, $options: 'i' } })
                .skip(page * 10).limit(10);
            return books.map(b => ({
                id: b._id,
                title: b.title,
                publishingYear: b.publishingYear,
                genres: b.genres,
                authors: b.authors,
                quantity: b.quantity,
                price: b.price
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBooksByGenre: async (genre, page) => {
        try {
            const books = await Book.find({ genres: genre })
                .skip(page * 10).limit(10);
            return books.map(b => ({
                id: b._id,
                title: b.title,
                publishingYear: b.publishingYear,
                genres: b.genres,
                authors: b.authors,
                quantity: b.quantity,
                price: b.price
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBooksByYearRange: async (startYear, endYear, page) => {

        try {

            const books = await Book.find({ publishingYear: { $gte: startYear, $lte: endYear } })
                .skip(page * 10).limit(10);
            return books.map(b => ({
                id: b._id,
                title: b.title,
                publishingYear: b.publishingYear,
                genres: b.genres,
                authors: b.authors,
                quantity: b.quantity,
                price: b.price
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBooksByAuthorCountry: async (country, page) => {
        try {
            // Find the author by country
            const authors = await getAuthorByCountry(country);

            if (!authors) {
                return [];
            }
            const books = await Book.find({
                'authors': {
                    $in: authors
                }
            }).skip(page * 10).limit(10);

            return books.map(b => ({
                id: b._id,
                title: b.title,
                publishingYear: b.publishingYear,
                genres: b.genres,
                authors: b.authors,
                quantity: b.quantity,
                price: b.price
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createBook: async (title, publishingYear, genres, authors, quantity, price) => {
        try {
            const newBook = new Book({
                title,
                publishingYear,
                genres,
                authors,
                quantity,
                price,
            });
            return await newBook.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, createManyBooks: async (booksData) => {
        try {
            const newBooks = await Book.insertMany(booksData);
            return newBooks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteBook: async (bookId) => {
        try {
            const result = await Book.deleteOne({ _id: bookId });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
