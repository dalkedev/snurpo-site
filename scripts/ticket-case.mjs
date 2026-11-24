export function ticketCase(copy) {
  return `<section id="case" class="ticket-case wrap section" aria-labelledby="case-title">
  <div class="case-intro">
    <h2 id="case-title">${copy.title}</h2>
    <p>${copy.intro}</p>
  </div>
  <noscript><p>${copy.fallback} <a class="text-link" href="/docs/inspect-and-search/">${copy.guide}</a></p></noscript>
  <div class="case-workbench" data-case-workbench hidden>
    <div class="case-bar">
      <h3>${copy.archive}</h3>
      <span data-case-count></span>
    </div>
    <div class="case-grid">
      <div class="case-archive">
        <button type="button" class="case-filter" aria-pressed="false" aria-controls="case-requests" data-case-filter>${copy.filter}</button>
        <p class="case-meta" data-case-scope></p>
        <div class="case-requests" id="case-requests" role="group" aria-label="${copy.group}"></div>
      </div>
      <div class="case-detail">
        <div data-case-view="waiting">
          <h3>${copy.waiting}</h3>
          <p data-case-recent-hint>${copy.recentHint}</p>
          <p data-case-filtered-hint hidden>${copy.filteredHint}</p>
        </div>
        <div data-case-view="healthy" hidden>
          <h3 data-case-healthy-path></h3><p>${copy.runtime.healthy}</p>
        </div>
        <div data-case-view="edit" hidden>
          <div class="case-detail-label"><span class="status fail">422</span><code>POST /tickets/print</code></div>
          <h3>${copy.editTitle}</h3>
          <pre class="case-code"><code>{ "qty": 0 }</code></pre>
          <p class="case-error-body">${copy.errorBody}</p>
          <form class="case-form" data-case-form novalidate>
            <label for="case-qty">${copy.qty}</label>
            <div class="case-form-controls">
              <input id="case-qty" name="qty" type="number" min="1" step="1" required value="0" aria-describedby="case-validation">
              <button type="submit" class="case-action">${copy.replay}</button>
            </div>
            <p class="case-validation" id="case-validation" hidden>${copy.invalid}</p>
          </form>
        </div>
        <div data-case-view="printed" hidden>
          <h3 data-case-result-title tabindex="-1">${copy.printed}</h3>
          <div class="case-comparison">
            <div><span>${copy.original}</span><b class="status fail">422</b><code>{ "qty": 0 }</code></div>
            <div><span>${copy.replayed}</span><b class="status ok">201</b><code data-case-payload></code></div>
          </div>
          <p>${copy.doneHint}</p>
        </div>
      </div>
    </div>
    <div class="case-bottom"><small>${copy.synthetic}</small><button type="button" data-case-reset>${copy.reset}</button></div>
  </div>
  <a class="case-proof text-link" href="https://github.com/dalkedev/snurpo/pull/47">${copy.proof} · PR #47</a>
  <p class="case-sr-only" role="status" aria-atomic="true" data-case-status></p>
</section>`;
}
