require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    'project1',
    'root', 
    '',
    {
      dialect: 'mysql',
      host: 'localhost',
      pool: {max:5, min:0,idle:10000},
      logging: true
    }
);
sequelize.authenticate().then(()=>{
  console.log("authentication connected")
}).catch(err=>{
  console.log("error" + err)
});

const db =  {}
db.Sequelize = Sequelize
db.sequelize = sequelize
//  db.users = require('./models/users')(sequelize,DataTypes)

db.sequelize.sync().
then(()=>{
    console.log("sync");
})
module.exports = db;