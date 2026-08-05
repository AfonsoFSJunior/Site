const ALLOWED_ORIGINS = [
  'https://afonsoferreira.adv.br',
  'https://www.afonsoferreira.adv.br',
  'https://afonsofsjunior.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Brand card: #00303d · accent CTA: #C7B279
const BRAND = {
  card: '#00303d',
  accent: '#C7B279',
  text: '#00303d',
};

const COPY = {
  pt: {
    label: 'Contato',
    title: 'Recebi sua mensagem',
    greeting: (name) => `Olá, ${name}!`,
    thanks:
      'Obrigado por entrar em contato pelo meu site. Sua mensagem chegou corretamente e eu retorno o mais breve possível.',
    autoNoteBefore:
      'Este é um e-mail automático de confirmação. Se precisar complementar alguma informação, envie uma nova mensagem pelo site ou escreva para',
    regards: 'Atenciosamente,',
    role: 'Advogado · Direito do Trabalho, Civil e Empresarial · OAB/MG 57.178',
    cta: 'Visitar o site',
    footerBefore: 'Enviado automaticamente por',
    footerFrom: 'a partir de',
    noReply: 'Não responda a este e-mail.',
    subject: 'Recebi sua mensagem — Afonso Ferreira',
    logoFile: 'logo-email-pt.png',
  },
  en: {
    label: 'Contact',
    title: 'I received your message',
    greeting: (name) => `Hello, ${name}!`,
    thanks:
      'Thank you for getting in touch through my website. Your message arrived successfully and I will get back to you as soon as possible.',
    autoNoteBefore:
      'This is an automatic confirmation email. If you need to add more information, please send a new message through the site or write to',
    regards: 'Best regards,',
    role: 'Attorney · Labor, Civil & Business Law · OAB/MG 57.178',
    cta: 'Visit the website',
    footerBefore: 'Sent automatically by',
    footerFrom: 'from',
    noReply: 'Please do not reply to this email.',
    subject: 'I received your message — Afonso Ferreira',
    logoFile: 'logo-email-en.png',
  },
  it: {
    label: 'Contatto',
    title: 'Ho ricevuto il suo messaggio',
    greeting: (name) => `Buongiorno, ${name}!`,
    thanks:
      'Grazie per avermi contattato tramite il mio sito. Il messaggio è arrivato correttamente e risponderò al più presto.',
    autoNoteBefore:
      'Questa è un’e-mail automatica di conferma. Se desidera aggiungere informazioni, invii un nuovo messaggio dal sito oppure scriva a',
    regards: 'Cordiali saluti,',
    role: 'Avvocato · Diritto del Lavoro, Civile e Societario · OAB/MG 57.178',
    cta: 'Visita il sito',
    footerBefore: 'Inviata automaticamente da',
    footerFrom: 'da',
    noReply: 'Non rispondere a questa e-mail.',
    subject: 'Ho ricevuto il suo messaggio — Afonso Ferreira',
    logoFile: 'logo-email-it.png',
  },
};

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveLang(value) {
  const lang = String(value || '').toLowerCase();
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('it')) return 'it';
  return 'pt';
}

function hostFromUrl(siteUrl) {
  try {
    return new URL(siteUrl).host;
  } catch {
    return 'afonsoferreira.adv.br';
  }
}

function inboxLocalPart(inboxTo) {
  const match = String(inboxTo || '').match(/^([^<\s]+)/);
  return (match ? match[1] : 'contato@').trim();
}

function noReplyHint(fromNoReply) {
  const match = String(fromNoReply || '').match(/[\w.+-]+@[\w.-]+/);
  return match ? match[0] : 'no-reply@';
}

function buildAutoReplyHtml({
  lang,
  safeName,
  safeSiteUrl,
  logoUrl,
  logoMarkUrl,
  inboxEmail,
  siteHost,
  noReplyAddress,
}) {
  const t = COPY[lang] || COPY.pt;
  const card = BRAND.card;
  const accent = BRAND.accent;
  const text = BRAND.text;

  return `
      <div style="margin:0;padding:0;background:#ffffff;font-family:Georgia,'Times New Roman',serif;color:${text};">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="background-color:#ffffff;padding:40px 12px;">
          <tr>
            <td align="center" bgcolor="#ffffff" style="background-color:#ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;border-collapse:collapse;">
                <tr>
                  <td bgcolor="${card}" style="background-color:${card};">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" bgcolor="${card}" style="background-color:${card};padding:36px 28px 8px;">
                          <a href="${safeSiteUrl}" style="text-decoration:none;">
                            <img src="${logoUrl}" alt="Afonso Ferreira" width="180" height="62" style="display:block;width:180px;max-width:70%;height:auto;border:0;margin:0 auto;outline:none;" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="${card}" style="background-color:${card};padding:28px 28px 8px;">
                          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);">${t.label}</p>
                          <h1 style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;font-weight:700;">${t.title}</h1>
                          <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#ffffff;">${t.greeting(safeName)}</p>
                          <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:rgba(255,255,255,0.78);">${t.thanks}</p>
                          <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:rgba(255,255,255,0.78);">${t.autoNoteBefore} <a href="mailto:${escapeHtml(inboxEmail)}" style="color:${accent};text-decoration:underline;font-weight:700;">${escapeHtml(inboxEmail)}</a>.</p>
                          <p style="margin:0 0 8px;font-size:16px;line-height:1.65;color:#ffffff;">${t.regards}<br /><strong style="font-family:Arial,Helvetica,sans-serif;letter-spacing:0.04em;">Afonso Ferreira da Silva Júnior</strong></p>
                          <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.55);">${t.role}</p>
                          <a href="${safeSiteUrl}" style="display:inline-block;background-color:${accent};color:${text};text-decoration:none;padding:14px 22px;border-radius:2px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.04em;">${t.cta}</a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" bgcolor="${card}" style="background-color:${card};padding:32px 28px 36px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid rgba(255,255,255,0.14);">
                            <tr>
                              <td align="center" bgcolor="${card}" style="background-color:${card};padding-top:24px;">
                                <a href="${safeSiteUrl}" style="text-decoration:none;">
                                  <img src="${logoMarkUrl}" alt="AF" width="48" height="31" style="display:block;width:48px;max-width:18%;height:auto;border:0;margin:0 auto 14px;outline:none;" />
                                </a>
                                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:rgba(255,255,255,0.5);">${t.footerBefore} <a href="${safeSiteUrl}" style="color:#ffffff;text-decoration:none;">${escapeHtml(siteHost)}</a> ${t.footerFrom} ${escapeHtml(noReplyAddress)}.<br />${t.noReply}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;
}

async function sendResend(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      data?.message ||
      data?.error?.message ||
      (typeof data?.error === 'string' ? data.error : null) ||
      JSON.stringify(data) ||
      `Resend HTTP ${response.status}`;
    throw new Error(message);
  }
  return data;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: 'Origin not allowed' }, 403, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, origin);
    }

    // Honeypot: bots fill this; humans leave it empty
    if (body.website) {
      return json({ ok: true }, 200, origin);
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const message = String(body.message || '').trim();
    const lang = resolveLang(body.lang);

    if (!name || name.length > 120) {
      return json({ error: 'Invalid name' }, 400, origin);
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 200) {
      return json({ error: 'Invalid email' }, 400, origin);
    }
    if (!message || message.length > 5000) {
      return json({ error: 'Invalid message' }, 400, origin);
    }

    if (!env.RESEND_API_KEY) {
      return json({ error: 'Server misconfigured' }, 500, origin);
    }

    const fromNoReply = env.FROM_NO_REPLY || 'Afonso Ferreira <no-reply@afonsoferreira.adv.br>';
    const inboxTo = env.INBOX_TO || 'contato@afonsoferreira.adv.br';
    const templateId =
      lang === 'en'
        ? env.RESEND_AUTO_REPLY_TEMPLATE_ID_EN || env.RESEND_AUTO_REPLY_TEMPLATE_ID
        : lang === 'it'
          ? env.RESEND_AUTO_REPLY_TEMPLATE_ID_IT || env.RESEND_AUTO_REPLY_TEMPLATE_ID
          : env.RESEND_AUTO_REPLY_TEMPLATE_ID;
    const siteUrl = env.SITE_URL || 'https://afonsoferreira.adv.br';
    const safeName = escapeHtml(name);
    const safeSiteUrl = escapeHtml(siteUrl);
    const copy = COPY[lang] || COPY.pt;
    const inboxEmail = inboxLocalPart(inboxTo);
    const siteHost = hostFromUrl(siteUrl);
    const noReplyAddress = noReplyHint(fromNoReply);

    const autoReplyHtml = buildAutoReplyHtml({
      lang,
      safeName,
      safeSiteUrl,
      logoUrl: `${safeSiteUrl}/${copy.logoFile}?v=2`,
      logoMarkUrl: `${safeSiteUrl}/logo-mark-email.png?v=2`,
      inboxEmail,
      siteHost,
      noReplyAddress,
    });

    try {
      await sendResend(env.RESEND_API_KEY, {
        from: fromNoReply,
        to: [inboxTo],
        reply_to: [email],
        subject: `Novo contato pelo site — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: ${BRAND.text}; line-height: 1.6;">
            <h2 style="margin: 0 0 16px;">Nova mensagem do site — Afonso Ferreira</h2>
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
            <p><strong>Idioma:</strong> ${lang}</p>
            <p><strong>Mensagem:</strong></p>
            <p style="white-space: pre-wrap; background: #f7f8fa; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
          </div>
        `,
      });

      try {
        if (templateId) {
          await sendResend(env.RESEND_API_KEY, {
            from: fromNoReply,
            to: [email],
            subject: copy.subject,
            template: {
              id: templateId,
              variables: {
                CONTACT_NAME: name,
                SITE_URL: siteUrl,
              },
            },
          });
        } else {
          await sendResend(env.RESEND_API_KEY, {
            from: fromNoReply,
            to: [email],
            subject: copy.subject,
            html: autoReplyHtml,
          });
        }
      } catch (autoReplyError) {
        // If the Resend dashboard template is broken, fall back to HTML.
        const autoDetail =
          autoReplyError instanceof Error ? autoReplyError.message : String(autoReplyError);
        console.error('auto-reply template failed, using HTML fallback:', autoDetail);
        await sendResend(env.RESEND_API_KEY, {
          from: fromNoReply,
          to: [email],
          subject: copy.subject,
          html: autoReplyHtml,
        });
      }

      return json({ ok: true }, 200, origin);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error('contact-api error:', detail);
      return json({ error: 'Failed to send email', detail }, 502, origin);
    }
  },
};
