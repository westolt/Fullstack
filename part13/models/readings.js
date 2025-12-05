const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readings extends Model {}

Readings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readings'
})

module.exports = Readings
