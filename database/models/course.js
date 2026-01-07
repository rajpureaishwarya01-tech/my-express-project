'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      tableName: 'courses',
      freezeTableName: true,
    }
  );

  Course.associate = (models) => {
    Course.belongsToMany(models.User, {
      through: models.UserCourse,
      foreignKey: 'courseId',
      otherKey: 'userId',
    });
  };

  return Course;
};
