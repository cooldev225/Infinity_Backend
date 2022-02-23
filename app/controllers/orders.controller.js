const db = require("../models");
const path = require('path');
const jwtDecode = require("jwt-decode");
const request = require('request');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const fs = require('fs');
const user_model = require('../modules/user.js');
const User = db.users;
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
var bcrypt = require('bcrypt');

exports.getOrderTableData = async (req, res) => {
  res.header={
    "Access-Control-Allow-Origin":"*"
  }
  let body=null;
  res.status(200).send(body);
};