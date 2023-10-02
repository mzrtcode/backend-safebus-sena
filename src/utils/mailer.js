import nodemailer from 'nodemailer'
import '../config.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Verificar conexión con el servidor SMTP
transporter.verify().then(() => {
  console.log(':: Listo para enviar emails ::')
})

/* const template = `
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="text-align: center; position: relative;">
        <img src="https://user-images.githubusercontent.com/71569136/260169335-730b248d-62b8-4405-86e7-828d4aa664ee.png" alt="Logo" style="width: 200px; margin-top: 50px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    </div>
    <div style="background-color: #fff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
        <h2 style="margin-top: 120px;">Detalles de registro</h2>
        <p>¡Hola [Nombre del Usuario]!</p>
        <p>Tus datos de inicio de sesión son:</p>
        <ul>
            <li><strong>Usuario:</strong> [Usuario]</li>
            <li><strong>Contraseña:</strong> [Contraseña]</li>
        </ul>
        <p>Te recomendamos cambiar tu contraseña después de iniciar sesión por primera vez.</p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        <p>¡Gracias por unirte a nuestro sitio!</p>
        <p>Saludos,</p>
        <p>El equipo de [Nombre de la Compañía]</p>
    </div>
</body>
` */

export async function enviarEmail (destinatarios, asunto, template) {
  // Si destinatarios es una cadena de texto, conviértela en un array
  if (typeof destinatarios === 'string') {
    destinatarios = destinatarios.split(',').map(email => email.trim())
  }

  // Enviar el correo con el objeto de transporte definido
  const info = await transporter.sendMail({
    from: '"SafeBusApp 🚌" <infosafebusapp@gmail.com>',
    to: destinatarios.join(', '),
    subject: asunto,
    html: template
  })
}
