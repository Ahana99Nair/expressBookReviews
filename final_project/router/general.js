const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (username && password){
        if (!isValid(username)){
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        }else {
            return res.status(404).json({message: "User already exists!"});
        }
    }

    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise1 = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(JSON.stringify(books,null,4));
        }, 3000)           
    })//Write your code here
    myPromise1.then((succesMessage)=>{
        res.send(succesMessage);
    })
    
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let myPromise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        const isbn = req.params.isbn;
        resolve(books[isbn]);
    }, 3000)
  })
  myPromise2.then((succesMessage)=>{
    res.send(succesMessage)
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let myPromise3 = new Promise((resolve, reject)=>{
    const author = req.params.author;
    let filter_book = Object.values(books).filter((book)=>book.author===author);
    resolve(filter_book);
  })
  myPromise3.then((succesMessage)=>{
    res.send(succesMessage)
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let myPromise4 = new Promise((resolve, reject)=>{
    const title = req.params.title;
    let filter_book = Object.values(books).filter((book)=>book.title===title);
    resolve(filter_book)
  })
  myPromise4.then((succesMessage)=>{
    res.send(succesMessage)
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
