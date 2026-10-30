# Inquiry delivery

The contact form and server handler are implemented. No delivery account, secret, public endpoint, or server deployment has been configured. The website launched on October 30, 2026 with the existing form unchanged at the owner's request; delivery will be connected later. The current form retains its preview behavior and never sends.

## Connecting delivery after launch

1. Configure an email delivery account and a permitted sender address. The implementation uses the [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email). Account setup and any sender verification must be completed before real delivery can be tested. The recipient is fixed to `digitalfremont@gmail.com` in business data.
2. Deploy `inquiry.mjs` as a separate Cloudflare Worker using the supplied `wrangler.jsonc`. The handler follows the [Workers fetch contract](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/). The static site's hosting manifest remains unchanged.
3. Set runtime values on that Worker: secret `RESEND_API_KEY`, sender `CONTACT_FROM`, and `ALLOWED_ORIGIN` equal to the final website origin without a trailing slash. Never commit credentials or insert them into frontend build variables.
4. Retain the `INQUIRY_LIMITER` binding in the supplied configuration. It applies 10 attempts per minute per connecting IP at a Cloudflare location, including retries and invalid requests. This is an approximate local limit, not a global quota; shared connections also share it. See [Cloudflare rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/). Verify the namespace is not reused for an unrelated limiter in the selected account.
5. Set frontend `CONTACT_ENDPOINT` to the deployed HTTPS endpoint ending in `/api/inquiry` when building the release. Set `SITE_URL` to `https://digitalfremont.com`. An absent endpoint preserves the existing preview behavior. Build validation cannot establish that the remote endpoint is configured correctly.
6. Before enabling real submissions, verify the form from its permitted origin, obtain authorization for a test submission, and confirm receipt in the owner's inbox. Also verify a failed request preserves the visitor's text and offers phone/email alternatives.

For a private hosted preview, use its actual origin in `ALLOWED_ORIGIN`; change this to the final public origin when launching. File previews have no permitted origin and never submit. Do not allow wildcard or null origins as a preview workaround.

## Behavior and boundaries

The browser sends JSON to the handler. The handler requires the permitted origin, JSON content, a valid UUID request key, the runtime limiter, a bounded body, and valid fields. It checks that a specific service belongs to the selected category. The honeypot rejects automated submissions without delivering them.

Only the fixed business inbox receives the message. Visitors cannot set the recipient or sender. Request content is plain text; the reply-to field is included only for a validated email contact. The submitted preferred contact and context remain in the message. No automatic email is sent to the visitor.

A successful response is returned only after the delivery provider accepts the request and returns a message ID. An accepted message is not proof of inbox placement; that remains a launch check. Error responses do not expose provider credentials or detailed provider responses. A repeated unchanged request reuses its provider idempotency key to avoid duplicate delivery after an uncertain result.

No inquiry database or client-side persistent storage is used. The delivery provider and receiving mailbox necessarily process and retain submitted email. The form's privacy note explains that information is used to respond.

## Verification

Run `node scripts/verify-inquiry-server.mjs` from `site/`. It covers origin rejection, missing configuration, rate limiting, body/field validation, fixed recipient, email/phone contact, category matching, provider failure, and success. Delivery is mocked: tests do not use an API key or send actual messages.
