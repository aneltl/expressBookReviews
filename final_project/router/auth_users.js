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


regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

   
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    
    if (isValid(username) && authenticatedUser(username, password)) {
        
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' }); // 'your_jwt_secret' should be stored securely
        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});


regd_users.put("/auth/review/:isbn", (req, res) => {
   
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
