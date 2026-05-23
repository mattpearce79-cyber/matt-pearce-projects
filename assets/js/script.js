document.addEventListener('DOMContentLoaded', () => {
  buildSkillWheel();
  initNavMenu();
});

function initNavMenu() {
  const trigger  = document.getElementById('menu-trigger');
  const close    = document.getElementById('menu-close');
  const menu     = document.getElementById('nav-menu');
  const overlay  = document.getElementById('nav-menu-overlay');
  if (!trigger || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

function buildSkillWheel() {
  const container = document.getElementById('skill-wheel');
  if (!container) return;

  const skills = [
    'UX Design', 'UI Design', 'Web Design', 'App Design', 'Branding',
    'Game Design', 'Prototyping', 'User Research', 'Design Systems', 'AI Tools'
  ];

  const colors = [
    '#464daf', '#3045b8', '#ce842f', '#cec92f', '#46af58',
    '#46a6af', '#9c46af', '#af4b4b', '#2f9fce', '#46af8c'
  ];

  const size  = 300;
  const cx    = size / 2;
  const cy    = size / 2;
  const R     = 135; // outer radius
  const r     = 55;  // inner radius
  const midR  = (R + r) / 2;
  const n     = skills.length;
  const step  = (2 * Math.PI) / n;
  const start = -Math.PI / 2; // begin at top

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  for (let i = 0; i < n; i++) {
    const a0   = start + i * step;
    const a1   = start + (i + 1) * step;
    const aMid = (a0 + a1) / 2;

    // Arc path
    const x1 = cx + R * Math.cos(a0), y1 = cy + R * Math.sin(a0);
    const x2 = cx + R * Math.cos(a1), y2 = cy + R * Math.sin(a1);
    const x3 = cx + r * Math.cos(a1), y3 = cy + r * Math.sin(a1);
    const x4 = cx + r * Math.cos(a0), y4 = cy + r * Math.sin(a0);

    const d = [
      `M ${f(x1)} ${f(y1)}`,
      `A ${R} ${R} 0 0 1 ${f(x2)} ${f(y2)}`,
      `L ${f(x3)} ${f(y3)}`,
      `A ${r} ${r} 0 0 0 ${f(x4)} ${f(y4)}`,
      'Z'
    ].join(' ');

    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', colors[i]);
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);

    // Label — radial orientation, flip left-half to stay readable
    const lx   = cx + midR * Math.cos(aMid);
    const ly   = cy + midR * Math.sin(aMid);
    let aDeg   = ((aMid * 180 / Math.PI) % 360 + 360) % 360;
    let rotDeg = aDeg;
    if (aDeg > 90 && aDeg < 270) rotDeg = aDeg + 180;

    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', f(lx));
    text.setAttribute('y', f(ly));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('transform', `rotate(${f(rotDeg)}, ${f(lx)}, ${f(ly)})`);
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '8.5');
    text.setAttribute('font-weight', '700');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('pointer-events', 'none');
    text.textContent = skills[i];
    svg.appendChild(text);
  }

  // White centre circle
  const circle = document.createElementNS(ns, 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', r - 3);
  circle.setAttribute('fill', 'white');
  svg.appendChild(circle);

  container.appendChild(svg);
}

function f(n) { return n.toFixed(2); }
