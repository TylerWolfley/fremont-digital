// Local demonstration only: no fetch, external accounts, storage, or user data.
(() => {
  const demo = document.querySelector('[data-automation-demo]');
  if (!demo) return;
  const samples = {
    quote: { name: 'Alex Morgan', interest: 'A website project quote', task: 'Reply to Alex about the project', detail: 'Review the request and ask for the project details needed to prepare a quote.' },
    booking: { name: 'Jordan Lee', interest: 'Booking a consultation', task: 'Arrange a time with Jordan', detail: 'Check availability and send the booking options. Nothing has been booked automatically.' },
  };
  const get = name => demo.querySelector(`[data-demo-${name}]`);
  const request = get('request'), run = get('run'), reset = get('reset'), complete = get('complete');
  function clear() {
    get('name').textContent = 'Ready for an inquiry'; get('interest').textContent = '—'; get('source').textContent = '—'; get('record-status').textContent = '—';
    get('task').textContent = 'No task yet'; get('task-detail').textContent = 'Run the example to see the next step.';
    complete.checked = false; complete.disabled = true; reset.disabled = true;
    get('status').textContent = 'Ready. Choose a request to begin.'; demo.removeAttribute('data-state');
  }
  run.addEventListener('click', () => {
    const sample = samples[request.value]; if (!sample) return;
    get('name').textContent = sample.name; get('interest').textContent = sample.interest; get('source').textContent = 'Website inquiry'; get('record-status').textContent = 'Awaiting reply';
    get('task').textContent = sample.task; get('task-detail').textContent = sample.detail;
    complete.checked = false; complete.disabled = false; reset.disabled = false; demo.dataset.state = 'created';
    get('status').textContent = `Customer record and follow-up task created for ${sample.name}. Nothing was sent.`;
  });
  complete.addEventListener('change', () => {
    get('record-status').textContent = complete.checked ? 'Follow-up complete' : 'Awaiting reply';
    get('status').textContent = complete.checked ? 'Task marked complete in this demonstration.' : 'Task reopened in this demonstration.';
  });
  request.addEventListener('change', clear); reset.addEventListener('click', () => { clear(); run.focus(); });
  demo.hidden = false;
})();
