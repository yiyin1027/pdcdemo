const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    console.log(req.user);
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
    // res.redirect('/auth/login');
  } else {
    next();
  }
};


router.get('/', authCheck, (req, res) => {
  // console.log(res.status(200).json());
  console.log(req.user);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
  console.log("you logged in");
});


module.exports = router;