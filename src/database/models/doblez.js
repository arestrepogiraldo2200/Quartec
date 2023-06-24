
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "doblez";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        width: {type: DataTypes.TEXT},
        fold: {type: DataTypes.FLOAT},
    };

    let config = {
        tableName: "doblez",
        timestamps: false,
    };

    const Doblez = sequelize.define(alias, cols, config);
   
    return Doblez;

};