const pool = require('../utils/mysql.connect.js');
const QRCode = require('qrcode');

const generateAndSaveQR = async (cedula_rif, nombre) => {
    try {
        let msg = {
            status: false,
            message: 'User not found',
            code: 404
        };

        const connection = await pool.getConnection();

        const sqlUser = 'SELECT cedula_rif, nombre, codigo_qr, url_qr, estado_qr FROM aliados WHERE cedula_rif = ? AND nombre = ?';
        const [users] = await connection.execute(sqlUser, [cedula_rif, nombre]);

        if (users.length > 0) {
            const user = users[0];

            if (user.codigo_qr) {
                // Si ya existe un QR, devolverlo
                let qrCodeString;
                if (Buffer.isBuffer(user.codigo_qr)) {
                    qrCodeString = `data:image/png;base64,${user.codigo_qr.toString('base64')}`;
                } else if (typeof user.codigo_qr === 'string') {
                    qrCodeString = user.codigo_qr.startsWith('data:image') ? user.codigo_qr : `data:image/png;base64,${user.codigo_qr}`;
                } else {
                    console.error('Unexpected type for codigo_qr:', typeof user.codigo_qr);
                    qrCodeString = ''; // Handle unexpected case
                }

                msg = {
                    status: true,
                    message: 'QR code retrieved successfully',
                    code: 200,
                    qrCode: qrCodeString,
                    qrUrl: user.url_qr,
                    qrStatus: user.estado_qr
                };
            } else {
                // Si no existe, generar uno nuevo y actualizar la base de datos
                const qrUrl = `https://compraqa.polizaqui.com`; // Usar encodeURIComponent para asegurar caracteres válidos en la URL
                const qrCode = await QRCode.toDataURL(qrUrl);
                const sqlUpdateQR = 'UPDATE aliados SET codigo_qr = ?, url_qr = ?, estado_qr = ? WHERE cedula_rif = ? AND nombre = ?';
                await connection.execute(sqlUpdateQR, [qrCode, qrUrl, 'Activo', cedula_rif, nombre]);

                msg = {
                    status: true,
                    message: 'QR code generated and saved successfully',
                    code: 200,
                    qrCode: qrCode,
                    qrUrl: qrUrl,
                    qrStatus: 'Activo'
                };
            }
        }

        connection.release();
        return msg;

    } catch (err) {
        console.error('Error generating or saving QR code:', err);
        return {
            status: false,
            message: 'Server error',
            code: 500,
            error: err.message
        };
    }
};

module.exports = {
    generateAndSaveQR
};
