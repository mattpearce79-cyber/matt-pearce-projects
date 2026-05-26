localStorage.removeItem('blueprint-theme');

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
