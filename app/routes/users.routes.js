module.exports = app => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.get("/login", users.login);
  router.post("/login", users.login);
  router.post("/register", users.register);
  router.get("/verify_token", users.verifyToken);
  router.post("/getTreeData", users.getTreeData);
  app.use('/api/users', router);
};
