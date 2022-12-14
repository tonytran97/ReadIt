const router = require(`express`).Router();
const { Review } = require('../models');
const Book = require('../models/Book');
const User = require('../models/Users');
const withAuth = require(`../utils/auth`);

router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: [
            'id', 'date_posted', 'content', 'user_id', 'book_id',
          ],
        },
      ],
    })
    .catch((err) => {
        res.json(err);
    });

    req.session.save(() => {
      req.session.book_id = req.params.id;
    });

    const book = bookData.get({ plain: true });

    res.render('reviews', { 
        book,
        loggedIn: req.session.loggedIn, 
        user: req.session.user,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.post(`/:id`, withAuth, (req, res) => {
//     Review.create({
//         comment_text: req.body.comment_text,
//         post_id: req.body.post_id,
//         user_id: req.session.user_id
//     })
//     .then((reviewData) => res.json(reviewData))
//     .catch((err) => {
//         res.status(400).json(err);
//     });
// });

router.delete(`/:id`, (req, res) => {
    Review.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(reviewData => {
        if (!reviewData) {
          res.status(404).json({ message: 'No review found.' });
          return;
        }
        res.json(reviewData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put(`/:id`, (req, res) => {
    Review.update(
        { review_text: req.body.review_text}, 
        { where: { id:  req.params.id} }
        )
    .then((reviewData) => {
        if (!reviewData) {
            res.status(404).json({ message: `No review found.`});
            return;
        }
        res.json(postData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;