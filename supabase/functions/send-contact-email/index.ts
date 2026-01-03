import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Email de destino das notificações - CONFIGURAR COM O EMAIL DO CLIENTE
const NOTIFICATION_EMAIL = "contato@juriscompany.net";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    console.log("Recebendo contato de:", name, email);

    // Enviar email de notificação para o escritório
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #5C0A0A, #8B1A1A); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #5C0A0A; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #5C0A0A; margin-top: 10px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Novo Contato Recebido</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Nome:</span> ${name}
            </div>
            <div class="field">
              <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
            </div>
            ${phone ? `<div class="field"><span class="label">Telefone:</span> <a href="tel:${phone}">${phone}</a></div>` : ''}
            ${subject ? `<div class="field"><span class="label">Assunto:</span> ${subject}</div>` : ''}
            <div class="field">
              <span class="label">Mensagem:</span>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            Este email foi enviado automaticamente através do formulário de contato do site.
          </div>
        </div>
      </body>
      </html>
    `;

    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Juris Company <contato@juriscompany.net>",
        to: [NOTIFICATION_EMAIL],
        subject: subject ? `Novo contato: ${subject}` : `Novo contato de ${name}`,
        html: notificationHtml,
      }),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error("Erro ao enviar notificação:", errorData);
      throw new Error(`Falha ao enviar email de notificação: ${errorData}`);
    }

    console.log("Email de notificação enviado com sucesso");

    // Enviar email de confirmação para o cliente
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #5C0A0A, #8B1A1A); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none; }
          .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">JURIS COMPANY</div>
            <p style="margin: 0; opacity: 0.9;">Advocacia & Consultoria Jurídica</p>
          </div>
          <div class="content">
            <h2 style="color: #5C0A0A; margin-top: 0;">Olá, ${name}!</h2>
            <p>Recebemos sua mensagem e agradecemos pelo contato.</p>
            <p>Nossa equipe analisará sua solicitação e retornará o mais breve possível, em até <strong>24 horas úteis</strong>.</p>
            <p>Se precisar de atendimento urgente, entre em contato diretamente:</p>
            <ul>
              <li><strong>Telefone:</strong> (96) 93223-1425</li>
              <li><strong>Email:</strong> contato@juriscompany.net</li>
            </ul>
            <p>Atenciosamente,<br><strong>Equipe Juris Company</strong></p>
          </div>
          <div class="footer">
            <p style="margin: 5px 0;">R. Prof. Tostes, 783 - Centro, Macapá - AP, CEP 68900-022</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Juris Company. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Juris Company <contato@juriscompany.net>",
        to: [email],
        subject: "Recebemos sua mensagem - Juris Company",
        html: confirmationHtml,
      }),
    });

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.text();
      console.error("Erro ao enviar confirmação:", errorData);
      // Não vamos falhar aqui, pois o email principal foi enviado
    } else {
      console.log("Email de confirmação enviado com sucesso");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados com sucesso" 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erro na função send-contact-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
