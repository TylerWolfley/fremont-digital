import { arrow } from './icons.mjs';

// An illustrative workflow, never a fabricated customer system or live activity feed.
export function connectionVisual() {
  return `<aside class="connection-visual" aria-labelledby="connection-title">
    <div class="connection-top"><span>Fremont Digital</span><span aria-hidden="true">FD / 01</span></div>
    <p class="connection-caption">A service inquiry, connected</p>
    <h2 id="connection-title">Good first impression.<br> Useful next step.</h2>
    <ol class="connection-path">
      <li><span class="connection-number" aria-hidden="true">01</span><div><h3>Your website</h3><p>Show the work. Explain the service.</p></div></li>
      <li><span class="connection-number" aria-hidden="true">02</span><div><h3>A customer gets in touch</h3><p>The form collects the details you need.</p></div></li>
      <li><span class="connection-number" aria-hidden="true">03</span><div><h3>The follow-up is organized</h3><p>A customer record and a task to respond.</p></div></li>
    </ol>
    <div class="connection-bottom"><span>Example workflow</span><a href="/automation/">See how I can help ${arrow}</a></div>
  </aside>`;
}
