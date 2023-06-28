
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "cotizacion";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        num: {type: DataTypes.INTEGER, unique: true},
        client: {type: DataTypes.TEXT},
        fecha: {type: DataTypes.TEXT},
        validez: {type: DataTypes.TEXT},
        entrega: {type: DataTypes.TEXT},
        condiciones: {type: DataTypes.TEXT},
        estado: {type: DataTypes.TEXT},
        aprobacion: {type: DataTypes.TEXT},
        proyecto: {type: DataTypes.TEXT},
        pago: {type: DataTypes.TEXT},
        transporte: {type: DataTypes.TEXT},
        materiales: {type: DataTypes.TEXT},
        asesor: {type: DataTypes.TEXT},
        observ1:{type: DataTypes.TEXT},
        observ2: {type: DataTypes.TEXT},
        aprob: {type: DataTypes.INTEGER},
    };

    let config = {
        tableName: "cotizacion",
        timestamps: false,
    };

    const Cotizacion = sequelize.define(alias, cols, config);
   
    return Cotizacion;

};