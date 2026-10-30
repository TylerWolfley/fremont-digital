// Dependency-free helpers shared by the browser and server-side verification.
(() => {
  function validateInquiry(data, allowedCategories) {
    const errors = {};
    const clean = {};
    const limits = { name: 100, category: 40, service: 80, method: 10, contact: 160, context: 240, location: 100, message: 4000, timing: 160, company_url: 240 };
    for (const [key, max] of Object.entries(limits)) {
      const value = data?.[key];
      clean[key] = typeof value === 'string' ? value.trim() : '';
      if (typeof value !== 'string' && value !== undefined || clean[key].length > max) errors[key] = 'Please shorten or correct this field.';
    }
    if (!clean.name) errors.name = 'Enter your name.';
    if (!allowedCategories.includes(clean.category)) errors.category = 'Choose a service category.';
    if (!['phone', 'email'].includes(clean.method)) errors.method = 'Choose how you’d like a reply.';
    if (clean.method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.contact)) errors.contact = 'Enter a valid email address.';
    if (clean.method === 'phone' && (!/^[+\d() .-]+$/.test(clean.contact) || clean.contact.replace(/\D/g, '').length < 10 || clean.contact.replace(/\D/g, '').length > 15)) errors.contact = 'Enter a phone number with area code.';
    if (clean.message.length < 10) errors.message = 'Add a few details about what you need (at least 10 characters).';
    return { data: clean, errors, valid: Object.keys(errors).length === 0 };
  }
  async function sendInquiry(endpoint, data, requestId, transport = fetch) {
    const formspree = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
    // Formspree expects `email` for Reply-To and `_gotcha` for its spam trap.
    // Keep the custom endpoint's request/response contract for installations using it.
    const payload = formspree ? {
      name: data.name, category: data.category, service: data.service,
      reply_by: data.method, contact: data.contact,
      ...(data.method === 'email' ? { email: data.contact } : { phone: data.contact }),
      message: data.message, context: data.context, location: data.location, timing: data.timing,
      _gotcha: data.company_url,
      _subject: 'Fremont Digital website inquiry',
    } : data;
    const response = await transport(endpoint, {
      method: 'POST', credentials: 'omit',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...(!formspree ? { 'Idempotency-Key': requestId } : {}) },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || (formspree ? result.ok !== true : result.accepted !== true)) {
      const error = new Error(response.status === 429 ? 'Please wait a minute before trying again, or call directly.' : 'Your request could not be confirmed. Your details are still here. Please try again, call, or email.');
      error.fields = formspree ? {} : result.fields || {};
      if (formspree && Array.isArray(result.errors)) {
        for (const item of result.errors) {
          const name = ['email', 'phone'].includes(item.field) ? 'contact' : item.field;
          if (['name', 'contact', 'message', 'context', 'location', 'timing'].includes(name)) error.fields[name] = 'Please check this field and try again.';
        }
      }
      throw error;
    }
    return result;
  }
  globalThis.FremontInquiryTools = Object.freeze({ validateInquiry, sendInquiry });
})();
