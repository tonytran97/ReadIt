const router = require('express').Router();
const Book = require('../models/Book');
const User = require('../models/Users');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
    const bookData = await Book.findAll({
    }).catch((err) => {
        res.json(err);
    });
    const books = bookData.map((book) => book.get({ plain: true }));
    res.render('homepage', { 
        books,
        loggedIn: req.session.loggedIn, 
        user: req.session.user,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect(`/`);
        return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) => {
    if (req.session.loggedIn){
        res.redirect(`/`);
        return;
    }
    res.render('signup');
});

// withAuth not working here, will need to put back in
router.get(`/newread`, (req, res) => {
    res.render(`newread`, {
        loggedIn: req.session.loggedIn, 
        user: req.session.user,
    });
});

// router.get(`/reviews`, (req, res) => {
//     res.render(`reviews`, {
//         loggedIn: req.session.loggedIn, 
//         user: req.session.user,
//     });
// });

router.get(`/newreview`, withAuth, (req, res) => {
    res.render(`newreview`, {
        loggedIn: req.session.loggedIn, 
        user: req.session.user,
    });
  });
  
router.get(`/404`, (req, res) => {
    res.render(`404`, {
        loggedIn: req.session.loggedIn, 
        user: req.session.user,
    });
    res.status(404);
});

module.exports = router;