const Author = require('../models/author');

module.exports = {
    getAllAuthors: async (page) => {
        try {
            const allAuthors = await Author.find({}).skip(page * 10).limit(10);
            return allAuthors.map(a => ({
                id: a._id,
                name: a.name,
                country: a.country
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createAuthor: async (name, country) => {
        try {
            const newAuthor = new Author({ name, country });
            return await newAuthor.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateAuthor: async (strId, updatedValues) => {
        try {
            const result = await Author.updateOne({ _id: strId }, { $set: updatedValues });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
