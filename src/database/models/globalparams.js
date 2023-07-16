
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "globalparams";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        num: {type: DataTypes.INTEGER},
        globalcorte: {type: DataTypes.FLOAT},
        globalmaterial: {type: DataTypes.FLOAT},

    };

    let config = {
        tableName: "globalparams",
        timestamps: false,
    };

    const Globalparams = sequelize.define(alias, cols, config);
   
    return Globalparams;

};