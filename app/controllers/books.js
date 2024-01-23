const { getAllBooks, getBooksByName, getBooksByGenre, getBooksByYearRange, getBooksByAuthorCountry, createBook, createManyBooks, deleteBook } = require('../services/books');

module.exports = {
    listBooks: async (req, res) => {
        try {
            const page = req.params.page || 0;
            const books = await getAllBooks(page);
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    searchBooksByName: async (req, res) => {
        try {
            const { name, page } = req.query;
            const books = await getBooksByName(name, page || 0);
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    filterBooksByGenre: async (req, res) => {
        try {
            const { genre, page } = req.query;
            const books = await getBooksByGenre(genre, page || 0);
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    filterBooksByYearRange: async (req, res) => {
        try {
            const { startYear, endYear, page } = req.query;
            const books = await getBooksByYearRange(startYear, endYear, page || 0);
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    filterBooksByAuthorCountry: async (req, res) => {
        try {
            const { country, page } = req.query;
            const books = await getBooksByAuthorCountry(country, page || 0);
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    createBook: async (req, res) => {
        try {
            const bookData = req.body;
            if (Array.isArray(bookData)) {
                const newBooks = await createManyBooks(bookData);
                res.json(newBooks);
            } else {
                const { title, publishingYear, genres, authors, quantity, price } = bookData;
                const newBook = await createBook(title, publishingYear, genres, authors, quantity, price);
                res.json(newBook);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    deleteBook: async (req, res) => {
        try {
            const bookId = req.params.id;
            const result = await deleteBook(bookId);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    }
};
