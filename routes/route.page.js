var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET posts page. */
router.get("/posts", function(req, res, next) {
  res.render("posts", { title: "Express" });
});



module.exports = router;
