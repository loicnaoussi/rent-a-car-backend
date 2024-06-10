// models/vehicle.js
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_per_day: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    motor_power_hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fuel_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    engine_capacity_cc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    traction: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {  // Assurez-vous que c'est 'image_url' et non 'image_urls'
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Vehicle;
};
