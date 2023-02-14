const getTaskModel = (sequelize, { DataTypes }) => {
  const Task = sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      priority: {
        type: DataTypes.ENUM,
        values: ["LOW", "MEDIUM", "HIGH"],
        defaultValue: "LOW",
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      progress: {
        type: DataTypes.ENUM,
        values: [0, 20, 50, 80, 100],
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["TODO", "IN PROGRESS", "PENDING", "DONE"],
        allowNull: false,
        defaultValue: "TODO",
        validate: {
          notEmpty: true,
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Task;
};

module.exports = getTaskModel;
