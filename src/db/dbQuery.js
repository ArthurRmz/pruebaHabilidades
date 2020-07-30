const pool = require("./pool");

const query = (quertText, params) => {
    return new Promise((resolve, reject) => {
      pool.query(quertText, params)
        .then((res) => {
          //console.log("[dbQuery][query] Sql correcto");
          resolve(res);
        })
        .catch((err) => {
          console.log("[dbQuery][query] Error"+err);
          reject(err);
        });
    });
};

module.exports = {query};