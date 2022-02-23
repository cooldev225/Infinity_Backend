module.exports = app => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.post("/login", users.login);
  router.post("/register", users.register);
  app.use('/api/users', router);
};
