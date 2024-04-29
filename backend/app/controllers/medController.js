const Med = require('../models/medModel');

exports.Medregister = (req, res, next) => {
    const MedBody = {
        nombre: req.body.nombre,
        dosis: req.body.dosis,
        frecuenciaDosis: req.body.frecuenciaDosis,
        fechaInicio: req.body.fechaInicio,
        tipoTratamiento: req.body.tipoTratamiento,
        duracion: req.body.duracion,
        horario: req.body.horario,
        notas: req.body.notas,
        userID: req.body.userID
    }
    const med = new Med(MedBody)
    med.save()
        .then(med => {
            const dataMed = {
                nombre: med.nombre,
                dosis: med.dosis,
                frecuenciaDosis: med.frecuenciaDosis,
                fechaInicio: med.fechaInicio,
                tipoTratamiento: med.tipoTratamiento,
                duracion: med.duracion,
                userID: med.userID
            }
            res.send({ dataMed });
        })
        .catch(err => {
            res.status(500).send('Server error');
        });
}

exports.getMedById = async (req, res) => {
    try {
        const meds = await Med.find({userID: req.params.userID}).exec();
        if (!meds || meds.length === 0) {
            return res.status(404).json({ message: 'No se encontraron medicamentos para ese ID de usuario.' });
        }
        res.send(meds);
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al buscar los medicamentos.' });
    }
}

exports.deleteMedById = async (req, res, next) => {
    const medID = req.params.id;
    try {
        const deletedMed = await Med.findByIdAndDelete(medID);
        if (!deletedMed) {
            return res.status(404).json({ message: 'Med not found' });
        }
        res.json({ message: 'Med deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}