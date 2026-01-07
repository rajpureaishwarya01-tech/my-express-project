'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define(
    'UserCourse',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // lowercase
          key: 'id',
        },
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
    },
    {
      tableName: 'user_courses',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return UserCourse;
};
