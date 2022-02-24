const db = require("../models");
const path = require('path');
const jwtDecode = require("jwt-decode");
const request = require('request');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const fs = require('fs');
const order_model = require('../modules/order.js');
exports.getOrderTableData = async (req, res) => {
  let pagination = req.body.pagination;
  let body=await order_model.getOrderTableData(pagination);
  res.status(200).send(body);
};