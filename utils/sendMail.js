const nodemailer = require("nodemailer");

const sendRecoveryMail = async (email, link) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: `"Alaia Cocina 🍲" <${testAccount.user}>`,
    to: email,
    subject: "🔐 Recuperación de contraseña - Alaia Cocina",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <h2 style="color: #333;">Alaia Cocina 🍲</h2>
          <h3 style="color: #555;">Solicitud para restablecer contraseña</h3>
        </div>
        <p style="color: #444;">Hola, hemos recibido una solicitud para restablecer tu contraseña. Si fuiste tú, haz clic en el botón de abajo. Este enlace será válido por <strong>10 minutos</strong>.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            🔐 Restablecer contraseña
          </a>
        </div>

        <p style="color: #999; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña actual no se verá afectada.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="color: #aaa; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Alaia Cocina - Todos los derechos reservados</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("✅ Correo enviado (Ethereal):", previewUrl);
  return previewUrl;
};

module.exports = sendRecoveryMail;
