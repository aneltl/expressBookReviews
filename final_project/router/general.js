const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');

// Task 10
async function getBooks() {
    try {
        const response = await axios.get('https://example.com/api/books'); 
        return response.data;  
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Task 11
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`https://example.com/api/books/isbn/${isbn}`);
        return response.data;  
    } catch (error) {
        console.error(`Error fetching book with ISBN ${isbn}:`, error);
    }
}

// Task 12
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`https://example.com/api/books/author/${author}`);
        return response.data; 
    } catch (error) {
        console.error(`Error fetching books by author ${author}:`, error);
    }
}

// Task 13
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`https://example.com/api/books/title/${title}`);
        return response.data;  
    } catch (error) {
        console.error(`Error fetching books with title ${title}:`, error);
    }
}

// Get book reviews by ISBN
public_users.get('/review/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const book = Object.values(books).find(b => b.isbn === isbn);
        if (book) {
            if (Object.keys(book.reviews).length > 0) {
                res.status(200).json(book.reviews); // Return reviews if available
            } else {
                res.status(200).json({ message: "No reviews available for this book." }); // No reviews available
            }
        } else {
            res.status(404).json({ message: "Book not found." }); // Book not found
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book reviews', error: error.message });
    }
});

module.exports.general = public_users;
