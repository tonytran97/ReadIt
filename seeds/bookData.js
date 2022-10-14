const { Book } = require('../models');

// dummy data
const bookData = [
    {title: 'Book 1', author:'Author 1'},
    {title: 'Book 2', author:'Author 2'},
    {title: 'Book 3', author:'Author 3'},
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;