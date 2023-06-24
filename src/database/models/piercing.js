module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "piercing";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        width: {type: DataTypes.TEXT},
        piercing: {type: DataTypes.FLOAT},
    };

    let config = {
        tableName: "piercing",
        timestamps: false,
    };

    const Piercing = sequelize.define(alias, cols, config);
   
    return Piercing;

};