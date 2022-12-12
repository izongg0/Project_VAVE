<<<<<<< HEAD
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "460813",
  connectionLimit: 5,
  database: "VAVE",
});

module.exports = {
  async run(query, params) {
    return new Promise((resolve, reject) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .query(query, params)
            .then((rows) => {
              resolve(rows);
              conn.end(); // (필수) connection 종료
            })
            .catch((err) => {
              console.log(err);
              conn.end(); // (필수) connection 종료
              reject(err);
            });
        })
        .catch((err) => {
          //not connected
          console.log(err);
          reject(err);
        });
    });
  },
};
=======
// const mariadb = require("mariadb");
// const pool = mariadb.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "460813",
//   connectionLimit: 5,
//   database: "VAVE",
// });

// module.exports = {
//   async run(query, params) {
//     return new Promise((resolve, reject) => {
//       pool
//         .getConnection()
//         .then((conn) => {
//           conn
//             .query(query, params)
//             .then((rows) => {
//               resolve(rows);
//               conn.end(); // (필수) connection 종료
//             })
//             .catch((err) => {
//               console.log(err);
//               conn.end(); // (필수) connection 종료
//               reject(err);
//             });
//         })
//         .catch((err) => {
//           //not connected
//           console.log(err);
//           reject(err);
//         });
//     });
//   },
// };
>>>>>>> 5c586cb8e57a3838b48e31fa158b4c076452da6b
