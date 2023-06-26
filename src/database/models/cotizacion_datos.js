
module.exports = (sequelize, DataTypes) => {

    // Creación del modelo ------------------------------------------------------------

    let alias = "cotizacion_datos";

    let cols = {
                
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        num: {type: DataTypes.INTEGER},
        cantidad: {type: DataTypes.INTEGER},
        descripcion: {type: DataTypes.TEXT},
        precio: {type: DataTypes.TEXT},
        material: {type: DataTypes.TEXT},
        espesor: {type: DataTypes.TEXT},
        perimetroautocad: {type: DataTypes.FLOAT},
        factorcorte: {type: DataTypes.FLOAT},
        perimetro: {type: DataTypes.FLOAT},
        largoautocad: {type: DataTypes.FLOAT},
        anchoautocad: {type: DataTypes.FLOAT},
        factorarea: {type: DataTypes.FLOAT},
        area: {type: DataTypes.FLOAT},
        piercings: {type: DataTypes.INTEGER},
        dobleces: {type: DataTypes.INTEGER},
        longdoblez: {type: DataTypes.FLOAT},
        conmaterial: {type: DataTypes.TEXT},
    };

    let config = {
        tableName: "cotizacion_datos",
        timestamps: false,
    };

    const Cotizacion_Data = sequelize.define(alias, cols, config);
   
    return Cotizacion_Data;

};