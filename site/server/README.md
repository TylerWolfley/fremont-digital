# Inquiry delivery

The October 30 audit added Formspree support alongside the original custom server. The owner supplied `https://formspree.io/f/mrppayow`, now saved as the production default. The custom server is not deployed. The owner submitted a live test and confirmed the success message and inbox receipt on October 30, 2026. Browser access was subsequently restored, and the agent checked live form validation and interactions without sending another inquiry. Real inbox delivery remains owner-confirmed, separately from the mocked tests. See `../LAUNCH.md` for the completed live audit.

## Formspree connection

1. The owner creates or selects a Formspree form that delivers to `digitalfremont@gmail.com` and completes any required account/email verification.
2. Save its public `https://formspree.io/f/FORM_ID` URL as `configuredContactEndpoint` in `src/config/contact.mjs`. This URL is public, not a credential. `CONTACT_ENDPOINT` remains an optional build override.
3. Build with `SITE_URL=https://digitalfremont.com` and `node scripts/build.mjs --release`, then publish through the existing Sites project. Review builds deliberately remain disconnected.
4. Check the account's allowed domains and spam protection without disabling protections automatically. Test a clearly labeled request through the published form and confirm it in the intended inbox. Account verification, quota, and any configured challenge remain provider-side dependencies.

The adapter submits JSON with `Accept: application/json`, maps an email contact to Formspree's `email` Reply-To field, maps the trap to `_gotcha`, and retains the chosen contact method and service. It requires an acknowledged success, prevents overlapping submissions, and keeps entered details after errors. It does not send the custom server's idempotency header to Formspree or promise provider-level deduplication. An uncertain network result can require checking the dashboard before retrying.

References: [Formspree AJAX submission example](https://formspree.io/blog/formspree-ajax/), [Reply-To field](https://help.formspree.io/articles/building-your-form/email-reply-to-address), and [honeypot field](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering).

## Alternative: custom Resend handler

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
