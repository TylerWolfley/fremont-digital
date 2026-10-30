import { arrow, plus } from './icons.mjs';

export function automationDemo() {
  return `<section id="demo" class="automation-demo section-space" aria-labelledby="demo-heading"><div class="section-container">
    <div class="demo-intro"><p class="eyebrow">See what a connection can do</p><h2 id="demo-heading">One inquiry.<br> The next steps, handled.</h2><p>Choose a sample request and run it. Watch the details turn into a customer record and a follow-up task.</p></div>
    <div data-automation-demo hidden><div class="demo-controls"><label for="demo-request">Sample website inquiry</label><select id="demo-request" data-demo-request><option value="quote">Alex Morgan — asks for a project quote</option><option value="booking">Jordan Lee — asks to book a consultation</option></select><button class="button button--primary" type="button" data-demo-run>Run the example ${arrow}</button><button class="demo-reset" type="button" data-demo-reset disabled>Reset</button></div>
    <div class="demo-results"><section aria-labelledby="record-heading"><p class="demo-result-label">Customer record</p><h3 id="record-heading" data-demo-name>Ready for an inquiry</h3><dl><dt>Interested in</dt><dd data-demo-interest>—</dd><dt>Source</dt><dd data-demo-source>—</dd><dt>Status</dt><dd data-demo-record-status>—</dd></dl></section><section aria-labelledby="task-heading"><p class="demo-result-label">Follow-up task</p><h3 id="task-heading" data-demo-task>No task yet</h3><p data-demo-task-detail>Run the example to see the next step.</p><label class="demo-check"><input type="checkbox" data-demo-complete disabled> Mark task complete</label></section></div>
    <p class="demo-status" role="status" aria-live="polite" data-demo-status>Ready. Choose a request to begin.</p></div>
    <noscript><p>Example: a website quote request creates a customer record and a reminder to respond. JavaScript enables the interactive demonstration.</p></noscript>
    <p class="demo-note">Interactive demonstration with fictional details. It runs in this page; no message is sent and no external account is connected.</p>
  </div></section>`;
}

export function automationConfidence() {
  const items = [
    ['Will it work with my tools?', 'Send the names of the forms, calendars, spreadsheets, or business software you use. I’ll check the available connections before proposing a setup. A workflow should fit the tools and permissions your business actually has.'],
    ['What happens if a connection fails?', 'Error handling belongs in the build. We’ll agree how failed steps are reported, which steps can be retried safely, and how to handle the work manually if needed. Any ongoing monitoring or maintenance is part of the support agreement.'],
    ['Who has access to the accounts?', 'Use business-owned accounts for your tools. We’ll identify the access needed for the work, document the connections, and go through how to change or remove that access at handover.'],
  ];
  return `<section class="automation-confidence section-space"><div class="section-container"><div class="section-heading"><div><p class="eyebrow">Before anything is connected</p><h2>It needs to fit the way you work.</h2></div><p class="section-lead">Start with one repeated task. We’ll check the tools, test the steps, and make sure you can manage the result.</p></div><div class="plain-faq">${items.map(([q,a])=>`<details><summary>${q}${plus}</summary><p>${a}</p></details>`).join('')}</div></div></section>`;
}
