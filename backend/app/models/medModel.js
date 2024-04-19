
const mongoose = require('mongoose');

const MedScheme = new mongoose.Schema(
    {
        nombre: {
            type: String, required: true, trim: true
        },
        dosis: {
            type: Number, required: true, trim: true
        },
        frecuenciaDosis : {
            type: String, required: true, trim: true
        },
        fechaInicio : {
            type: String, required: true, trim: true
        },
        tipoTratamiento : {
            type: String, required: true, trim: true
        },
        duracion : {
            type: String, required: true, trim: true
        },
        horario : {
            type: String, required: true, trim: true
        },
        notas : {
            type: String, required: true, trim: true
        },
        userID : {
            type: String, required: true, trim: true
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('med', MedScheme)