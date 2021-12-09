const db = require('../db')
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");

const User = db.sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        defaultValue: 'test@gmail.com'
    },
    gender: {
        type: DataTypes.STRING,
    },
    profilepic: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING(100)
    },
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }   
}
);
// User.beforeCreate((user, options) => {
//     return bcrypt.hash(user.password, 10)
//         .then(hash => {
//             user.password = hash;
//         })
//         .catch(err => { 
//             throw new Error(); 
//         });
// });

module.exports = User
