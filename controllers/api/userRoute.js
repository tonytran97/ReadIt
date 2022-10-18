const router = require(`express`).Router();
const { User } = require(`../../models`);

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
console.log(dbUserData);
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  console.log('test');
  console.log(req.body);
  console.log(req.body.username);
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      console.log(userData);
      if (!userData) {
        console.log('user error')
        res
          .status(400)
          .json({ message: 'user' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(validPassword);
      if (!validPassword) {
        console.log('pass error');
        res
          .status(400)
          .json({ message: 'pass' });
        return;
      }
  console.log('test 3');
      req.session.save(() => {
        req.session.loggedIn = true;
        // saves the user_id which can be used to load up the dashboard later
        req.session.user_id = userData.id;
        
        res.json({ user: userData, message: 'You are now logged in!' });
        console.log(req.session.logged_in);
      });
  
    } catch (err) {
      console.log('catch err');
      res.status(400).json(err);
    }
  });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        console.log("You have been logged out");
    } else {
        res.status(404).end();
    }
})

module.exports = router;