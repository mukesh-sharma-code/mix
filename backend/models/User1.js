
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        defaultValue: 'test@gmail.com'
    },
    gender:{
        type: DataTypes.STRING,
    },
    profilepic:{
        type: DataTypes.STRING(50)
    },
    password:{
        type: DataTypes.STRING(100)
    }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});