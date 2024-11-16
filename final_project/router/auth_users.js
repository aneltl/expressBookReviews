const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "exampleUser", password: "password123" } 
];


const isValid = (username) => {
    return users.some(user => user.username === username);
};


const authenticatedUser = (username, password) => {
    
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
        return true;
    }
    return false;
};

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No token provided" });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user; 
        next(); 
    });
};

regd_users.put("/auth/review/:isbn", authenticateJWT, (req, res) => {
    const { username } = req.user; 
    const { isbn } = req.params;  
    const { review } = req.body;  

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

   
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    
    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: `Review added for ISBN: ${isbn}` });
});


regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (isValid(username) && authenticatedUser(username, password)) {
        // Generate JWT token
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' }); // Secret should be stored securely

        // Send response with the token
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});


regd_users.delete("/auth/review/:isbn", authenticateJWT, (req, res) => {
    const { username } = req.user;  
    const { isbn } = req.params;   

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found or you're not the author" });
    }

    delete books[isbn].reviews[username];

    return res.status(200).json({ message: `Review deleted for ISBN: ${isbn}` });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
