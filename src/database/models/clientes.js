
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "clientes";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        client: {type: DataTypes.TEXT},
        name: {type: DataTypes.TEXT},
        name2: {type: DataTypes.TEXT},
        NIT: {type: DataTypes.TEXT},
        CC: {type: DataTypes.TEXT},
        direction: {type: DataTypes.TEXT},
        direction_send: {type: DataTypes.TEXT},
        telefono1: {type: DataTypes.TEXT},
        telefono2: {type: DataTypes.TEXT},
        telefono3: {type: DataTypes.TEXT},
        billing_email: {type: DataTypes.TEXT},
        email1: {type: DataTypes.TEXT},
        email2: {type: DataTypes.TEXT},
        email3: {type: DataTypes.TEXT},
        email4: {type: DataTypes.TEXT},
    };

    let config = {
        tableName: "clientes",
        timestamps: false,
    };

    const Clientes = sequelize.define(alias, cols, config);
   
    return Clientes;

};