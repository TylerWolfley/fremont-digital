import assert from 'node:assert/strict';
import { handleInquiry } from '../server/inquiry.mjs';
import { business } from '../src/data/business.mjs';
const origin = 'https://example.invalid';
const requestId = '69d43d15-5fde-452d-8f44-f0c9a2ec14fd';
const base = { name: 'Test Visitor', category: 'repairs-tech', service: 'phone-repair', method: 'email', contact: 'visitor@example.invalid', context: 'Phone model', location: 'Fremont County', message: 'The screen has a crack. Please discuss repair options.', timing: 'Next week', company_url: '' };
const env = { ALLOWED_ORIGIN: origin, RESEND_API_KEY: 'test-only-not-a-credential', CONTACT_FROM: 'Fremont Digital <test@example.invalid>', INQUIRY_LIMITER: { limit: async () => ({ success: true }) } };
function request(data = base, overrides = {}) {
  return new Request(`${origin}/api/inquiry`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', 'Idempotency-Key': requestId, ...overrides.headers }, body: typeof data === 'string' ? data : JSON.stringify(data) });
}
let calls = [];
const deliver = async (url, options) => { calls.push({ url, options, payload: JSON.parse(options.body) }); return Response.json({ id: 'mock-provider-id' }); };
const success = await handleInquiry(request({ ...base, to: 'attacker@example.invalid' }), env, deliver);
assert.equal(success.status, 200); assert.equal((await success.json()).accepted, true);
assert.deepEqual(calls[0].payload.to, [business.email]);
assert.equal(calls[0].payload.reply_to, base.contact);
assert(calls[0].payload.text.includes(base.message));
assert.equal(calls[0].options.headers['Idempotency-Key'], `fremont-inquiry/${requestId}`);
assert.equal(success.headers.get('Access-Control-Allow-Origin'), origin);
assert.equal(success.headers.get('Cache-Control'), 'no-store');
await handleInquiry(request({ ...base, method: 'phone', contact: '(307) 555-0123' }), env, deliver);
assert(!('reply_to' in calls[1].payload));
const checks = [
  [request(base, { headers: { Origin: 'https://untrusted.invalid' } }), env, 403],
  [request(base, { headers: { Origin: 'null' } }), env, 403],
  [request(), { ...env, RESEND_API_KEY: '' }, 503],
  [request(), { ...env, INQUIRY_LIMITER: undefined }, 503],
  [request(), { ...env, INQUIRY_LIMITER: { limit: async () => ({ success: false }) } }, 429],
  [request(base, { headers: { 'Content-Type': 'text/plain' } }), env, 415],
  [request(base, { headers: { 'Idempotency-Key': 'bad' } }), env, 400],
  [request('not JSON'), env, 400],
  [request({ ...base, message: 'x'.repeat(33000) }), env, 413],
  [request({ ...base, message: 'x'.repeat(4100) }), env, 422],
  [request({ ...base, name: '' }), env, 422],
  [request({ ...base, contact: 'bad@example.invalid\r\nBcc: bad@example.invalid' }), env, 422],
  [request({ ...base, company_url: 'spam' }), env, 400],
  [request({ ...base, service: 'website-builds' }), env, 422],
  [request({ ...base, category: 'unknown' }), env, 422],
];
for (const [req, config, expected] of checks) {
  const before = calls.length;
  assert.equal((await handleInquiry(req, config, deliver)).status, expected);
  assert.equal(calls.length, before, 'Rejected requests must not trigger delivery.');
}
for (const result of [Response.json({ error: 'Private provider detail' }, { status: 401 }), Response.json({}), new Response('not json')]) {
  const response = await handleInquiry(request(), env, async () => result);
  assert.equal(response.status, 502); assert(!(await response.text()).includes('Private provider detail'));
}
assert.equal((await handleInquiry(request(), env, async () => { throw new Error('Network timeout'); })).status, 502);
const preflight = await handleInquiry(new Request(`${origin}/api/inquiry`, { method: 'OPTIONS', headers: { Origin: origin } }), env, deliver);
assert.equal(preflight.status, 204);
assert.equal((await handleInquiry(new Request(`${origin}/api/inquiry`, { headers: { Origin: origin } }), env, deliver)).status, 405);
assert.equal((await handleInquiry(new Request(`${origin}/missing`, { headers: { Origin: origin } }), env, deliver)).status, 404);
console.log('Passed: inquiry validation, fixed recipient, origin checks, rate limit, size limits, provider success/failure, retry identity, and CORS. No real messages were sent.');
