/* 
File name : book.js
Author's name : Karanjot Singh 
StudentID : 301176732
Web App name : My Favourite Book lists
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    console.log(books);
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  // Send empty data in detail.ejs on add a new book
  var books = {
     Title:'',
     Price:'',
     Author:'',
     Genre:''
  }
  res.render('books/details' , {
    title: 'Add new Book',
    books: books
  });
  
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // Get data from post method
    var books = {
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
   }
   // Store new book to db
   book.create(books); 
   res.redirect('/books');
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  var id = req.params.id;
  // Get details of single book for edit
  book.find({_id:id}, (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details' , {
        title: 'Edit Book',
        books: books[0]
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  var id = req.params.id;
  var books = {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
 }
 // Update single book detail after submiting edit form
 book.updateOne({_id:id},books, function(err, obj) {
  if (err) {
    return console.error(err);
  }
  res.redirect('/books');
});  
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  var id = req.params.id;
  var myquery = { _id : id };
  // delete single book from db after click delete button
  book.deleteOne(myquery , function(err, obj) {
    if (err) {
      return console.error(err);
    }
    res.redirect('/books');
  });
  
});


module.exports = router;
