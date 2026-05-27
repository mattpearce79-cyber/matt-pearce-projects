localStorage.removeItem('blueprint-theme');

// Mobile hamburger nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;
  const nav = toggle.nextElementSibling;
  toggle.addEventListener('click', function () {
    const open = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('sidebar__nav--open', !open);
  });
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('sidebar__nav--open');
    }
  });
});

function setPainPointsView(section, view) {
  const container = document.getElementById(section + '-items');
  const gridBtn = document.getElementById(section + '-grid-btn');
  const listBtn = document.getElementById(section + '-list-btn');
  if (!container) return;

  const gridClass = container.dataset.gridClass || 'grid-3col';

  if (view === 'grid') {
    container.className = gridClass;
    container.style.display = '';
    container.style.flexDirection = '';
    container.style.gap = '';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  } else {
    container.className = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  }
}

function setDeliverablesView(view) {
  const container = document.getElementById('deliverables-items');
  const gridBtn = document.getElementById('deliverables-grid-btn');
  const listBtn = document.getElementById('deliverables-list-btn');
  if (!container) return;

  if (view === 'grid') {
    container.className = 'grid-3col';
    container.style.display = '';
    container.style.flexDirection = '';
    container.style.gap = '';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  } else {
    container.className = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  }
}

function setApproachView(view) {
  const container = document.getElementById('approach-items');
  const gridBtn = document.getElementById('approach-grid-btn');
  const listBtn = document.getElementById('approach-list-btn');
  if (!container) return;

  if (view === 'grid') {
    container.className = 'grid-2col';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  } else {
    container.className = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  }
}
