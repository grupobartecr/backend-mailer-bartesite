import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const sendEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY
        });

        const sentFrom = new Sender(
            process.env.EMAIL_FROM,
            process.env.EMAIL_FROM_NAME
        );

        const recipients = [
            new Recipient(process.env.EMAIL_TO, "Admin")
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject("Formulario de contacto sitio web www.barteservice.com")
            .setHtml(`
        <h1>Nuevo mensaje desde el formulario de contacto del sitio web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `);

        await mailerSend.email.send(emailParams);

        res.status(200).json({ ok: true, message: "Correo enviado correctamente" });

    } catch (error) {
        console.error("Mail error:", error);
        res.status(500).json({ ok: false, error: "Error enviando correo" });
    }
};
