# Contact API (Cloudflare Worker + Resend)

Formulário do site → Cloudflare Worker (`workers/contact-api/`) → Resend.

1. E-mail de aviso para a inbox (`INBOX_TO`), com Reply-To = e-mail do visitante
2. Auto-reply HTML para o visitante (PT/EN; gerado no Worker)

Não usa EmailJS. Templates em `workers/contact-api/templates/` são só referência visual.

## Pré-requisitos (infra)

1. Conta Resend + domínio verificado (SPF/DKIM)
2. Cloudflare Email Routing (ou equivalente):
   - `contato@domínio` → inbox real (Gmail)
   - `no-reply@domínio` → Drop / send-only
3. API key Resend

## Configurar o Worker

```bash
cd workers/contact-api
npm install
```

Edite `wrangler.toml` (já apontado para `afonsoferreira.adv.br`):

```toml
SITE_URL = "https://afonsoferreira.adv.br"
FROM_NO_REPLY = "Afonso Ferreira <no-reply@afonsoferreira.adv.br>"
INBOX_TO = "contato@afonsoferreira.adv.br"
```

`ALLOWED_ORIGINS` em `src/index.js` já inclui `https://afonsoferreira.adv.br` e `www` (+ localhost).

Secret (nunca commitar):

```bash
npx wrangler secret put RESEND_API_KEY
```

Deploy:

```bash
npx wrangler deploy
```

No Cloudflare, ligue o custom domain `contact-api.afonsoferreira.adv.br` ao Worker.

## Front

- Variável: `REACT_APP_CONTACT_API_URL` (padrão de produção: `https://contact-api.afonsoferreira.adv.br`)
- Local: copie `.env.example` → `.env.local` (`http://127.0.0.1:8787`)
- CI: fallback de produção em `.github/workflows/deploy.yml` → `https://contact-api.afonsoferreira.adv.br`

Body enviado:

```json
{ "name": "...", "email": "...", "message": "...", "website": "", "lang": "pt" | "en" }
```

Honeypot: campo `website` oculto; se preenchido, o Worker responde `{ ok: true }` sem enviar.

## Assets de e-mail

Logos públicas em `public/`:

- `logo-email.png` — wordmark clara (card `#00303d`)
- `logo-mark-email.png` — marca AF compacta

URLs: `${SITE_URL}/logo-email.png?v=1` (incremente `?v=` ao trocar assets).

## Testes locais

```bash
# terminal 1
cd workers/contact-api && npx wrangler dev

# terminal 2
cp .env.example .env.local
npm start
```

Checklist: PT → auto-reply PT; EN → EN; inbox com Reply-To; honeypot sem e-mail; origin estranha → 403; logos no Gmail.

## Contrato da API

| Status | Corpo |
|--------|--------|
| 200 | `{ "ok": true }` |
| 400 | validação |
| 403 | origin |
| 405 | método |
| 500 | sem `RESEND_API_KEY` |
| 502 | falha Resend |

CORS: só origins permitidas; `OPTIONS` → 204.
