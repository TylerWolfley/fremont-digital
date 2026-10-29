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
    const response = await transport(endpoint, {
      method: 'POST', credentials: 'omit',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
      body: JSON.stringify(data), signal: AbortSignal.timeout(20000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.accepted !== true) {
      const error = new Error(response.status === 429 ? 'Please wait a minute before trying again, or call directly.' : 'Your request could not be confirmed. Your details are still here. Please try again, call, or email.');
      error.fields = result.fields || {};
      throw error;
    }
    return result;
  }
  globalThis.FremontInquiryTools = Object.freeze({ validateInquiry, sendInquiry });
})();
