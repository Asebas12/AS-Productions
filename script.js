const $ = (s) => document.querySelector(s);
const root = document.documentElement;

/* Tema claro / oscuro (recuerda tu elección) */
const saved = localStorage.getItem('as-theme');
root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
$('#theme').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('as-theme', root.dataset.theme);
});

/* Menú móvil */
const menu = $('#menu'), nav = $('#nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.matches('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', false); }
});

/* Hero: las dos mitades del logo se separan según el cursor */
const h1 = $('#h1'), h2 = $('#h2');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('pointermove', (e) => {
    const x = (e.clientX / innerWidth - .5) * 2;   // -1 a 1
    const y = (e.clientY / innerHeight - .5) * 2;
    h1.style.transform = `translate(${-x * 5}px, ${-y * 4}px)`;
    h2.style.transform = `translate(${x * 5}px, ${y * 4}px)`;
  });
}

/* Formulario: sin backend todavía. Abre el correo del usuario con el mensaje armado. */
const CONTACT_EMAIL = 'hello@asproductions.com'; // <- cambia esto por tu correo real
$('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, status = $('#status');
  if (!f.name.value.trim() || !f.email.validity.valid || !f.msg.value.trim()) {
    status.textContent = 'Completa tu nombre, un correo válido y tu mensaje.';
    return;
  }
  const body = `${f.msg.value}\n\n${f.name.value} (${f.email.value})\nInterés: ${f.topic.value}`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('AS Productions · ' + f.topic.value)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Abriendo tu app de correo para enviar el mensaje.';
});

$('#year').textContent = new Date().getFullYear();
