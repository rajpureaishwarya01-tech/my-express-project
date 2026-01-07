const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(path.resolve(__dirname, '../../config/config.js'))[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);




const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Course = require('./course')(sequelize, Sequelize.DataTypes);
db.UserCourse = require('./userCourse')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;
