
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "corte";

    let cols = {
                
        "id": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        "width": {type: DataTypes.TEXT},
        "Ac. H.R": {type: DataTypes.FLOAT},
        "Ac. C.R": {type: DataTypes.FLOAT},
        "Ac. 1070": {type: DataTypes.FLOAT},
        "Ac. Inox. 304": {type: DataTypes.FLOAT},
        "Ac. Inox. 316": {type: DataTypes.FLOAT},
        "Ac. Inox. 430": {type: DataTypes.FLOAT},
        "Galv.": {type: DataTypes.FLOAT},
        "Alum.": {type: DataTypes.FLOAT},
        "Bronce": {type: DataTypes.FLOAT},
        "Cobre": {type: DataTypes.FLOAT},
        "Latón": {type: DataTypes.FLOAT},
    };

    let config = {
        tableName: "corte",
        timestamps: false,
    };

    const Corte = sequelize.define(alias, cols, config);
   
    return Corte;

};