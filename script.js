// ══════════════════════════════════════════════════════
//  PORTAFOLIO — Base de Datos II
//  Michael Axel Vilcapoma Ochoa
// ══════════════════════════════════════════════════════

// ─── DATOS DE CADA SEMANA ───────────────────────────
// ✏️ AQUÍ cambias los nombres de tus PDFs
// El campo "pdf" debe coincidir exactamente con el 
// nombre de tu archivo dentro de la carpeta pdf/
// Ejemplo: si tu archivo se llama "semana_1.pdf"
//          pon:  pdf:'pdf/semana_1.pdf'
// ────────────────────────────────────────────────────

const unidades = {

  1: {
    titulo: 'Unidad I — Introducción a Bases de Datos',
    semanas: [
      { n:1, tema:'Fundamentos de BD',             desc:'Conceptos básicos, tipos de SGBD.',         pdf:'pdf/semana_1.pdf'  },
      { n:2, tema:'Modelo Relacional',              desc:'Tablas, tuplas, atributos y relaciones.',   pdf:'pdf/semana_2.pdf'  },
      { n:3, tema:'SQL Básico',                     desc:'SELECT, INSERT, UPDATE, DELETE.',            pdf:'pdf/semana_3.pdf'  },
      { n:4, tema:'DDL y Constraints',              desc:'CREATE TABLE, ALTER, PRIMARY KEY.',          pdf:'pdf/semana_4.pdf'  },
    ]
  },

  2: {
    titulo: 'Unidad II — Diseño y Normalización',
    semanas: [
      { n:1, tema:'Modelo Entidad-Relación',        desc:'Diagrama ER, entidades y cardinalidad.',    pdf:'pdf/semana_5.pdf'  },
      { n:2, tema:'Primera y Segunda Forma Normal', desc:'1FN, 2FN y dependencias funcionales.',      pdf:'pdf/semana_6.pdf'  },
      { n:3, tema:'Tercera Forma Normal',           desc:'3FN, FNBC y eliminación de redundancias.',  pdf:'pdf/semana_7.pdf'  },
      { n:4, tema:'Integridad Referencial',         desc:'Claves foráneas, ON DELETE, ON UPDATE.',    pdf:'pdf/semana_8.pdf'  },
    ]
  },

  3: {
    titulo: 'Unidad III — SQL Avanzado',
    semanas: [
      { n:1, tema:'Funciones y Agregados',          desc:'GROUP BY, HAVING, funciones de agregado.',  pdf:'pdf/semana_9.pdf'  },
      { n:2, tema:'Vistas y Subconsultas',          desc:'CREATE VIEW, subconsultas correlacionadas.',pdf:'pdf/semana_10.pdf' },
      { n:3, tema:'Procedimientos y Funciones',     desc:'Stored Procedures y funciones almacenadas.',pdf:'pdf/semana_11.pdf' },
      { n:4, tema:'Triggers y Optimización',        desc:'Disparadores y estrategias de indexación.', pdf:'pdf/semana_12.pdf' },
    ]
  },

  4: {
    titulo: 'Unidad IV — Bases de Datos NoSQL',
    semanas: [
      { n:1, tema:'Introducción a NoSQL',           desc:'Tipos: documental, clave-valor, grafos.',   pdf:'pdf/semana_13.pdf' },
      { n:2, tema:'MongoDB',                        desc:'Colecciones, documentos BSON y consultas.', pdf:'pdf/semana_14.pdf' },
      { n:3, tema:'Redis y Caché',                  desc:'Estructuras en memoria, TTL y pub/sub.',    pdf:'pdf/semana_15.pdf' },
      { n:4, tema:'Comparativa SQL vs NoSQL',       desc:'Casos de uso, ventajas y desventajas.',     pdf:'pdf/semana_16.pdf' },
    ]
  }

};

// ─── LOGIN ──────────────────────────────────────────
// 🔐 Cambia 'admin' y '1234' por tu usuario y clave
const USUARIO = 'admin';
const CLAVE   = '1234';

function openLogin(){
  document.getElementById('loginOverlay').classList.add('show');
}

function closeLogin(){
  document.getElementById('loginOverlay').classList.remove('show');
}

function closeIfBg(e){
  if(e.target === document.getElementById('loginOverlay')) closeLogin();
}

function doLogin(){
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;

  if(u === USUARIO && p === CLAVE){
    localStorage.setItem('sesion', 'activa');
    closeLogin();
    syncNav();
    document.getElementById('err').textContent = '';
  } else {
    document.getElementById('err').textContent = 'Usuario o contraseña incorrectos';
  }
}

function logout(){
  localStorage.removeItem('sesion');
  syncNav();
  goHero();
}

function loggedIn(){
  return !!localStorage.getItem('sesion');
}

function syncNav(){
  document.getElementById('btnIn').style.display  = loggedIn() ? 'none' : '';
  document.getElementById('btnOut').style.display = loggedIn() ? ''     : 'none';
}

// ─── NAVEGACIÓN ─────────────────────────────────────
function show(id){
  ['secHero','secPerfil','secSemanas'].forEach(s => {
    document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
  });
}

function goHero(){
  show('secHero');
  window.scrollTo({ top:0, behavior:'smooth' });
}

function goPerfil(){
  show('secPerfil');
  window.scrollTo({ top:0, behavior:'smooth' });
}

function goUnit(n){
  showUnit(n);   // sin login — cualquier visitante puede ver
}

// ─── MOSTRAR SEMANAS DE UNA UNIDAD ──────────────────
function showUnit(n){
  show('secSemanas');
  window.scrollTo({ top:0, behavior:'smooth' });

  const data = unidades[n];

  document.getElementById('panelTitle').textContent = data.titulo;

  document.getElementById('semanasGrid').innerHTML = data.semanas.map(s => `
    <div class="s-card">
      <h4>Semana ${s.n}</h4>
      <p class="s-sub">${s.tema}</p>
      <p class="s-desc">${s.desc}</p>
      <a href="${s.pdf}" target="_blank">📄 Ver PDF</a>
    </div>
  `).join('');
}

// ─── ESTRELLAS DE FONDO ──────────────────────────────
function initStars(){
  const cv = document.getElementById('stars');
  if(!cv) return;
  const cx = cv.getContext('2d');
  let W, H, st = [];

  function resize(){
    W = cv.width  = innerWidth;
    H = cv.height = innerHeight;
    st = Array.from({ length:130 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      s: (Math.random() - .5) * .003
    }));
  }

  function draw(){
    cx.clearRect(0, 0, W, H);
    st.forEach(s => {
      s.a += s.s;
      if(s.a <= 0 || s.a >= 1) s.s *= -1;
      cx.beginPath();
      cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(248,180,190,${s.a * .5})`;
      cx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  addEventListener('resize', resize);
}

// ─── TECLA ENTER EN LOGIN ────────────────────────────
function initEnterKey(){
  ['user','pass'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('keydown', e => { if(e.key === 'Enter') doLogin(); });
  });
}

// ─── TECLA ESC CIERRA MODAL ──────────────────────────
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeLogin();
});

// ─── INICIO ──────────────────────────────────────────
window.onload = function(){
  syncNav();
  initStars();
  initEnterKey();
};