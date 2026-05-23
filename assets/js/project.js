document.addEventListener('DOMContentLoaded', () => {
  const panel    = document.getElementById('side-panel');
  const overlay  = document.getElementById('side-panel-overlay');
  const closeBtn = document.getElementById('side-panel-close');
  const bodyEl   = document.getElementById('side-panel-body');
  const trigger  = document.getElementById('details-trigger');
  const fab      = document.getElementById('info-fab');

  if (!panel || !trigger) return;

  function openPanel() {
    const source = document.getElementById('panel-all');
    if (bodyEl && source) bodyEl.innerHTML = source.innerHTML;
    panel.classList.add('is-open');
    overlay.classList.add('is-visible');
    panel.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    panel.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  if (fab) {
    fab.addEventListener('click', openPanel);

    const observer = new IntersectionObserver(
      ([entry]) => fab.classList.toggle('is-visible', !entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(trigger);
  }
});
