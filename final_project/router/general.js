const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post('/register', function (req, res) {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: 'Both username and password are required' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users[username] = { username, password }; 

    res.status(201).json({ message: 'User registered successfully', username });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; 
    const book = Object.values(books).find(b => b.isbn === isbn); 

    if (book) {
        res.status(200).json(book); 
    } else {
        res.status(404).json({ message: 'Book not found' }); 
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;  
    const booksByAuthor = [];  

    for (let bookId in books) {
        if (books[bookId].author.toLowerCase() === author.toLowerCase()) {
            booksByAuthor.push(books[bookId]); 
        }
    }

    if (booksByAuthor.length > 0) {
        res.status(200).json(booksByAuthor);  
    } else {
        res.status(404).json({ message: 'No books found by this author' });  
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();  
    const booksByTitle = [];  

    for (let bookId in books) {
        if (books[bookId].title.toLowerCase() === title) {
            booksByTitle.push(books[bookId]); 
        }
    }

    if (booksByTitle.length > 0) {
        res.status(200).json(booksByTitle);  
    } else {
        res.status(404).json({ message: 'No books found with this title' });  
    }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;  
    
    for (let key in books) {
        if (books[key].isbn === isbn) {
            const book = books[key];

            
            if (Object.keys(book.reviews).length > 0) {
                res.status(200).json(book.reviews);  
            } else {
                res.status(200).json({ message: "No reviews available for this book." });  // No reviews
            }
            return;  
        }
    }

  
    res.status(404).json({ message: "Book not found." });
});
module.exports.general = public_users;
