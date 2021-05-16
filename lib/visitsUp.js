// source file: https://github.com/ahmad-ali14/siteViews-counter/blob/master/src/visitsUp.js

const exppress = require('express');
const mongoose = require('mongoose');
const siteViews = require('./visitsModel');

siteViewsUp = function (db,  pageName ) {
    db.findOneAndUpdate({page: pageName }, {$inc: {counter: 1}}, {new:true})
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)});
}

module.exports = {
    siteViewsUp: function (database, collection, page ) {
        database.collection(collection).update({page: page}, {$inc: {counter: 1}}, {new:true})
        .then((data)=>{console.log(data)})
        .catch((err)=>{console.log(err)});
    }
    
};
