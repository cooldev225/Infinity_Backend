const db = require("../models");
const path = require('path');
const jwtDecode = require("jwt-decode");
const request = require('request');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const fs = require('fs');
const user_model = require('../modules/user.js');
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
var bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  res.header={
    "Access-Control-Allow-Origin":"*"
  }
  let email = req.query.email;
  let password = req.query.password; 
  let body=await user_model.login(email,password);
  res.status(200).send(body);
};
exports.register = async (req, res) => {
  let body=null;
  var condition = {};
  let email = req.body.email;
  let password = req.body.password; 
  let fullname = req.body.name;  
  let gender = req.body.gender!=null&&(req.body.gender==2||req.body.gender==='female')?2:1;
  var salt = bcrypt.genSaltSync(8);
  password = bcrypt.hashSync(password, salt);
  password = password.replace('$2b$', '$2y$');
  var namesplit=fullname.split(' ');
  let fname=namesplit[0];
  let lname=namesplit.length>1?namesplit[1]:'';
  let slug=(fname+lname).toLowerCase().replace(' ','-').replace('/','-').replace('&','').replace('--','-').replace(',','-').replace('amp;','');
  slug=await user_model.getSlug(slug,1,slug);
  let birth=req.body.birth!=null?req.body.birth:' ';
  condition.where = {
    email: {
      [Op.eq]: `${email}`
    }
  };
  if(await User.count(condition))
    body={code:1,msg:'Email is exist already!'};
  else{
    await User.create({
      role_id: 5,
      first_name: fname,
      last_name: lname,
      gender: gender,
      slug:slug,
      email:email,
      password:password,
      dob:birth,
      username:email,
      recovery_email:'',
      salt:salt,
      remember_code:'',
      activation_code:'',
      phone:'',
      country:'',
      state:'',
      city:'',
      address:'',
      current_city:'',
      last_login:0,
      ip_address:'',
      forgotten_password_code:'',
      forgotten_password_time:0,
      login_status:1,
      status:1,
      created_at:new Date(),
      updated_at:new Date(),
      created_by:0,
      updated_by:0,
      logintime:'',
      comments:'',
    })
    .then(data => {
      body={ code:0,msg:'success',user:{
        id:data.id,
        email:data.email,
        slug:data.slug,
        username:data.username,
      },avatar:avatar[gender-1]};
    }).catch(err => {
      console.error(err)
    });
  }
  if(body==null)body={ code:2,msg:'error' };
  res.status(200).send(body);
};
exports.verifyToken = async (req, res) => {
  res.header={
    "Access-Control-Allow-Origin":"*"
  }
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['Authorization'] || req.headers['authorization'];
  let body=await user_model.verifyToken(token);
  res.status(200).send(body);
};
exports.getTreeData = async (req, res) => {
  let user_id = req.body.user_id;
  let body=await user_model.getTreeData(user_id);
  res.status(200).send(body);
};