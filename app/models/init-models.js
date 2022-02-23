var DataTypes = require("sequelize").DataTypes;
var _application_order = require("./application_order");
var _application_user = require("./application_user");

function initModels(sequelize) {
  var application_order = _application_order(sequelize, DataTypes);
  var application_user = _application_user(sequelize, DataTypes);


  return {
    application_order,
    application_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
