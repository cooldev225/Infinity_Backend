module.exports = (app) => {
    require('./users.routes')(app);
    require('./orders.routes')(app);
};