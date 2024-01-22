
require('dotenv').config();

// Local database ------------------------------------------

module.exports = {
  "development": {
    "username": process.env.USERNAMELOCAL,
    "password": process.env.USERNAMELOCAL,
    "database": process.env.DATABASELOCAL,
    "host": process.env.HOSTLOCAL,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USERNAMELOCAL,
    "password": process.env.USERNAMELOCAL,
    "database": process.env.DATABASELOCAL,
    "host": process.env.HOSTLOCAL,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAMELOCAL,
    "password": process.env.USERNAMELOCAL,
    "database": process.env.DATABASELOCAL,
    "host": process.env.HOSTLOCAL,
    "dialect": "mysql"
  }
}

// Clever cloud database ------------------------------------------

// module.exports = {
//   "development": {
//     "username": process.env.USERNAMECLEVER,
//     "password": process.env.PASSWORDCLEVER,
//     "database": process.env.DATABASECLEVER,
//     "host": process.env.HOSTCLEVER,
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": process.env.USERNAMECLEVER,
//     "password": process.env.PASSWORDCLEVER,
//     "database": process.env.DATABASECLEVER,
//     "host": process.env.HOSTCLEVER,
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": process.env.USERNAMECLEVER,
//     "password": process.env.PASSWORDCLEVER,
//     "database": process.env.DATABASECLEVER,
//     "host": process.env.HOSTCLEVER,
//     "dialect": "mysql"
//   }
// }

// Familyapps Google cloud database ------------------------------------------

// module.exports = {
//   "development": {
//     "username": process.env.USERNAMEGOOGLE,
//     "password": process.env.PASSWORDGOOGLE,
//     "database": process.env.DATABASEGOOGLE,
//     "host": process.env.HOSTGOOGLE,
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": process.env.USERNAMEGOOGLE,
//     "password": process.env.PASSWORDGOOGLE,
//     "database": process.env.DATABASEGOOGLE,
//     "host": process.env.HOSTGOOGLE,
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": process.env.USERNAMEGOOGLE,
//     "password": process.env.PASSWORDGOOGLE,
//     "database": process.env.DATABASEGOOGLE,
//     "host": process.env.HOSTGOOGLE,
//     "dialect": "mysql"
//   }
// }