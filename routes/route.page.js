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

/* GET category page. */
router.get("/posts/category", function(req, res, next) {
  let id = req.query.id;
  res.render("categoryPage", { categoryid :id });
});


module.exports = router;
