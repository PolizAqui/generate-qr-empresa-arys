const { generateAndSaveQR } = require('../models/emisionQr');

const qrController = {};

qrController.generateQRCode = async (req, res) => {
    try {
        const { cedula_rif, nombre } = req.body;

        if (!cedula_rif || !nombre) {
            return res.status(400).json({ error: 'Missing required fields: cedula_rif, nombre' });
        }

        const result = await generateAndSaveQR(cedula_rif, nombre);
        
        if (!result.status) {
            return res.status(result.code).json({ error: result.message });
        } else {
            return res.status(result.code).json(result);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = qrController;
