module.exports = app => {
  const orders = require("../controllers/orders.controller.js");
  var router = require("express").Router();
  router.post("/getOrderTableData", orders.getOrderTableData);
  app.use('/api/orders', router);
};
