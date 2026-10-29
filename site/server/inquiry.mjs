// Deploy separately from the static site. No credentials belong in public files.
import '../src/scripts/inquiry-tools.js';
import { business } from '../src/data/business.mjs';
import { serviceGroups } from '../src/data/services.mjs';
import { serviceGuides } from '../src/data/service-guides.mjs';

const { validateInquiry } = globalThis.FremontInquiryTools;
const categories = Object.keys(serviceGuides);
const services = new Map(serviceGroups.flatMap(group => group.services.map(service => [service.id, { ...service, category: group.id }])));

async function boundedJSON(request) {
  const limit = 32768;
  if (Number(request.headers.get('Content-Length')) > limit) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { await reader.cancel(); throw new Error('size'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const data = JSON.parse(new TextDecoder().decode(bytes));
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('body');
  return data;
}

export async function handleInquiry(request, env, transport = fetch) {
  const origin = request.headers.get('Origin');
  const permitted = origin && origin !== 'null' && origin === env.ALLOWED_ORIGIN;
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', Vary: 'Origin', ...(permitted ? { 'Access-Control-Allow-Origin': origin } : {}) };
  const respond = (status, body, extra = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
  if (new URL(request.url).pathname !== '/api/inquiry') return respond(404, { error: 'Not found.' });
  if (!permitted) return respond(403, { error: 'Request origin not allowed.' });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key', 'Access-Control-Max-Age': '600' } });
  if (request.method !== 'POST') return respond(405, { error: 'Use POST.' }, { Allow: 'POST, OPTIONS' });
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.INQUIRY_LIMITER?.limit) return respond(503, { error: 'Online requests are unavailable. Please call or email.' });
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return respond(415, { error: 'Use JSON.' });
  const requestId = request.headers.get('Idempotency-Key') || '';
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(requestId)) return respond(400, { error: 'Invalid request identifier.' });
  try {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return respond(503, { error: 'Request verification is unavailable.' });
    const limit = await env.INQUIRY_LIMITER.limit({ key: `inquiry:${ip}` });
    if (!limit.success) return respond(429, { error: 'Please wait before retrying.' }, { 'Retry-After': '60' });
  } catch { return respond(503, { error: 'Online requests are temporarily unavailable.' }); }
  let submitted;
  try { submitted = await boundedJSON(request); }
  catch (error) { return respond(error.message === 'size' ? 413 : 400, { error: 'Invalid request body.' }); }
  const { data, errors, valid } = validateInquiry(submitted, categories);
  if (!valid) return respond(422, { fields: errors });
  if (data.company_url) return respond(400, { error: 'Request could not be verified.' });
  const service = data.service ? services.get(data.service) : null;
  if (data.service && (!service || service.category !== data.category)) return respond(422, { fields: { category: 'Choose the matching service category.' } });
  const guide = serviceGuides[data.category];
  const text = [
    `Fremont Digital website inquiry`,
    `Name: ${data.name}`,
    `Category: ${guide.label}`,
    ...(service ? [`Service: ${service.name}`] : []),
    `Preferred reply: ${data.method}`,
    `Contact: ${data.contact}`,
    `Town or area: ${data.location || 'Not provided'}`,
    `${guide.contextLabel}: ${data.context || 'Not provided'}`,
    `${guide.timingLabel}: ${data.timing || 'Not provided'}`,
    '', 'Request:', data.message,
  ].join('\n');
  try {
    const sent = await transport('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `fremont-inquiry/${requestId}` },
      body: JSON.stringify({ from: env.CONTACT_FROM, to: [business.email], subject: `Website inquiry: ${service?.name || guide.label}`, text, ...(data.method === 'email' ? { reply_to: data.contact } : {}) }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await sent.json().catch(() => ({}));
    if (!sent.ok || typeof result.id !== 'string' || !result.id) return respond(502, { error: 'The request could not be confirmed. Please retry or call.' });
    return respond(200, { accepted: true });
  } catch { return respond(502, { error: 'The request could not be confirmed. Please retry or call.' }); }
}

export default { fetch: (request, env) => handleInquiry(request, env) };
