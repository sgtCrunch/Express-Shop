const express = require('express');
const ExpressError = require('./ExpressError');
const itemRoutes = require('./itemRoutes');
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use("/items", itemRoutes);


app.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
});

app.use(function(err, req, res, next){

    let status = err.status || 500;
    let message = err.message;
    res.status(status).json({
        error: {message, status}
    });

});

module.exports = app;