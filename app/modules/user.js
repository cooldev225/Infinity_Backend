require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
const { query } = require("express");
var bcrypt = require('bcrypt');
exports.login = async (email, password) => {
    var body=null;
    var condition = {};
    //var salt = bcrypt.genSaltSync(8);
    //password = bcrypt.hashSync(password, salt);
    //password = password.replace('$2b$', '$2y$');
    condition.where = {
      user_name: {
        [Op.eq]: `${email}`
      }
    };
    if(!await db.application_user.count(condition))body={code:2,msg:'Email is not exist!'};
    else{
      await db.application_user.findAll(condition)
      .then(data => {
        for (let row of data) {
          //var dbpass=row.dataValues.password;
          //dbpass = dbpass.replace('$2y$', '$2b$');
          //if(bcrypt.compareSync(password, dbpass)){

            const token = jwt.sign(
                { user_id: row.dataValues.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            body={code:0,msg:'success',user:row,accessToken:token};    
            break;
          //}
        }      
        if(body==null)body={code:1,msg:'Password is wrong!'};
      }).catch(err => {
        console.error(err);
      });      
    }
    return body;
};
exports.verifyToken = async (token='') => {
    token=token.replace('Bearer ','');
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        var body=null;
        var condition={}
        condition.where = {
            user_name: {
                [Op.eq]: `${decoded.email}`
            }
        };
        await db.application_user.findAll(condition)
        .then(data => {
            for (let row of data) {
                body=row;    
                break;
            }     
        }).catch(err => {
            console.error(err);
        }); 
    }catch(e){
        //
    };
    return body;
};
exports.getTreeData = async (user_id=0) => {
    var body={};
    var query="SELECT * FROM application_user WHERE id="+user_id;
    let users=await db.sequelize.query(query,{type: QueryTypes.SELECT});
    if(users.length){
        query="SELECT * FROM application_user WHERE position='L' and father="+users[0].id;
        let lUsers=await db.sequelize.query(query,{type: QueryTypes.SELECT});
        let LT=lUsers.length?await this.getTreeData(lUsers[0].id):{name:'Empty'};
        query="SELECT * FROM application_user WHERE position='R' and father="+users[0].id;
        let rUsers=await db.sequelize.query(query,{type: QueryTypes.SELECT});
        let RT=rUsers.length?await this.getTreeData(rUsers[0].id):{name:'Empty'};
        //body={user:users[0],LT:LT,RT:RT}
        body={
            name:users[0].user_name,
            attributes:{PV:0},
        }
        if(lUsers.length||rUsers.length){
            body.children=[];
            body.children[0]=
                lUsers.length?LT:{
                    name: 'Empty'
                }
            body.children[1]=
                lUsers.length?RT:{
                    name: 'Empty'
                }
        }
    }else{
        body={name:'Empty'};
    }
    return body;
};
