
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "asesores";

    let cols = {
        
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.TEXT},
        is_admin: {type: DataTypes.INTEGER},
        password: {type: DataTypes.TEXT}

    };

    let config = {
        tableName: "asesores",
        timestamps: false,
    };

    const Asesores = sequelize.define(alias, cols, config);
   
    return Asesores;

};