const { getAllAuthors, createAuthor, updateAuthor } = require('../services/authors');

module.exports = {
    listAuthors: async (req, res) => {
        try {
            const page = req.params.page || 0; // default to page 0 if not provided
            const authors = await getAllAuthors(page);
            res.json(authors);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    createAuthor: async (req, res) => {
        try {
            const { name, country } = req.body;
            const newAuthor = await createAuthor(name, country);
            res.json(newAuthor);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedValues  = req.body;
            const result = await updateAuthor(id, updatedValues);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    }
};
