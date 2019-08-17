const utils = require('../utils');

exports.handle = function (db) {
    db.run(`CREATE TABLE IF NOT EXISTS apiKeys ( id integer unique, apikey TEXT unique, created_on TEXT NOT NULL, usedTimes integer DEFAULT 0, uses integer );`, function (err) {
        if(err) utils.error(err);
    })

}