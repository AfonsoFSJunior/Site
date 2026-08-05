# SiteAfonso

Site profissional de Afonso Ferreira da Silva Júnior, com conteúdo trilíngue (PT/EN/IT).

## Rodando localmente

```bash
npm install
npm start
```

## Build de produção

```bash
npm run build
```

## Contato (Worker + Resend)

O formulário em `src/pages/Contato.js` envia para um Cloudflare Worker que dispara e-mails via Resend.

Guia completo: [CONTACT_API.md](./CONTACT_API.md).

Resumo rápido:

```bash
cd workers/contact-api
npm install
npx wrangler secret put RESEND_API_KEY
# ajuste SITE_URL / FROM_NO_REPLY / INBOX_TO em wrangler.toml
npx wrangler deploy
```

No build/CI, `REACT_APP_CONTACT_API_URL` é `https://contact-api.afonsoferreira.adv.br`.

## Estrutura principal

- `src/pages/Home.js`: apresentação e resumo profissional
- `src/pages/Experiencia.js`: experiência profissional
- `src/pages/Formacao.js`: formação acadêmica e complementar
- `src/pages/Cursos.js`: cursos, idiomas e afiliações
- `src/pages/Curriculo.js`: download do currículo
- `src/pages/Contato.js`: dados de contato e formulário
- `workers/contact-api/`: API de contato (Cloudflare Worker)
