const router = require("express").Router();
const passport = require("passport");
let user = {};

router.get('/login',
  passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/login/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failed',
    // successRedirect: 'http://localhost:3000/'
  }),
  (req, res) => {
    console.log("callback " + req.user );
    user = {...req.user};
    console.log("user!!! " + user);
  //   user = req.user;
  //   // Successful authentication, redirect home.

    res.redirect('http://localhost:3000/');
  }
  );

router.get('/failed', (req, res) => {
  res.send("You are failed to log in!");
});

router.get('/login/success', (req, res) => {
  if (req.user !== undefined) {
    res.json({
      authenticated: true,
      user: req.user,
      cookies: req.cookies,
      message: "Authenticated"
    })
  } else {
    res.json({
      authenticated: false,
      cookies: req.cookies,
      message: "Not Authenticate"
    })
  }
});

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('http://localhost:3000/');
});

module.exports = router;
