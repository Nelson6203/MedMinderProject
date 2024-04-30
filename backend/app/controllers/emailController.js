const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helpmedminder@gmail.com', 
    pass: 'msut qedx atkh iymq' 
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.sendEmail = async (req, res) => {
  const { usuario, id, nombre, correo, consulta } = req.body;

  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: 'helpmedminder@gmail.com',
    subject: 'Consulta de ayuda y soporte',
    html: `
      <h3>Consulta de usuario:</h3>
      <p><strong>Fecha:</strong> ${new Date()}</p>
      <p><strong>Usuario:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Consulta realizada:</strong> ${consulta}</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.status(200).send('Correo electrónico enviado exitosamente');
    }
  });
  

};
