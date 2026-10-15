(function () {
  "use strict";

  const H = HISTORIA;
  const $ = (sel) => document.querySelector(sel);
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  // Permite probar otra fecha: index.html?hoy=2026-10-06
  const hoyForzado = new URLSearchParams(location.search).get("hoy");
  const ahora = () => {
    if (!hoyForzado) return new Date();
    const [y, m, d] = hoyForzado.split("-").map(Number);
    const n = new Date();
    return new Date(y, m - 1, d, n.getHours(), n.getMinutes(), n.getSeconds());
  };

  const [iy, im, id] = H.inicio.split("-").map(Number);
  const INICIO = new Date(iy, im - 1, id);

  /* ---------- Textos ---------- */
  function parrafos(contenedor, texto) {
    texto.split(/\n\s*\n/).forEach((t) => {
      const p = document.createElement("p");
      p.textContent = t.trim();
      contenedor.appendChild(p);
    });
  }

  $("#sobre-texto").textContent = H.sobre;
  $("#carta-titulo").textContent = H.carta.titulo;
  parrafos($("#carta-texto"), H.carta.texto);
  $("#carta-firma").textContent = H.carta.firma;
  $("#cierre-titulo").textContent = H.cierre.titulo;
  $("#cierre-texto").textContent = H.cierre.texto;
  $("#c-desde").textContent = `Desde el ${INICIO.getDate()} de ${MESES[INICIO.getMonth()]} de ${INICIO.getFullYear()}`;

  /* ---------- Línea de tiempo ---------- */
  function fotoVacia(titulo) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#f6e3e1'/><stop offset='1' stop-color='#e8b4b8'/></linearGradient></defs>
      <rect width='400' height='300' fill='url(#g)'/>
      <text x='200' y='140' text-anchor='middle' font-family='Georgia' font-size='46' fill='#c96f7b'>♥</text>
      <text x='200' y='185' text-anchor='middle' font-family='Georgia' font-style='italic' font-size='20' fill='#8e2f45'>Tu foto aquí</text>
      <text x='200' y='212' text-anchor='middle' font-family='Georgia' font-size='13' fill='#8e2f45' opacity='.7'>${titulo}</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function crearGaleria(fotos, titulo) {
    const galeria = document.createElement("div");
    galeria.className = "galeria";
    const pista = document.createElement("div");
    pista.className = "galeria-pista";
    galeria.appendChild(pista);

    fotos.forEach((src, i) => {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.alt = `${titulo} — foto ${i + 1}`;
      img.onerror = () => { img.onerror = null; img.src = fotoVacia(titulo); };
      img.src = src;
      img.addEventListener("click", () => abrirVisor(img.src));
      pista.appendChild(img);
    });

    if (fotos.length > 1) {
      const puntos = document.createElement("div");
      puntos.className = "galeria-puntos";
      fotos.forEach(() => puntos.appendChild(document.createElement("span")));
      puntos.firstChild.classList.add("activo");

      const mover = (dir) => pista.scrollBy({ left: dir * pista.clientWidth, behavior: "smooth" });
      [["ant", "‹", -1, "Foto anterior"], ["sig", "›", 1, "Foto siguiente"]].forEach(([clase, txt, dir, etiqueta]) => {
        const b = document.createElement("button");
        b.className = `galeria-flecha ${clase}`;
        b.textContent = txt;
        b.setAttribute("aria-label", etiqueta);
        b.addEventListener("click", () => mover(dir));
        galeria.appendChild(b);
      });

      pista.addEventListener("scroll", () => {
        const i = Math.round(pista.scrollLeft / pista.clientWidth);
        [...puntos.children].forEach((p, j) => p.classList.toggle("activo", i === j));
      }, { passive: true });

      galeria.appendChild(puntos);
    }
    return galeria;
  }

  const linea = $("#linea");
  H.secciones.forEach((s) => {
    const etapa = document.createElement("article");
    etapa.className = "etapa revelar";
    etapa.id = s.id;

    const fecha = document.createElement("p");
    fecha.className = "etapa-fecha";
    fecha.textContent = s.fecha;
    const titulo = document.createElement("h2");
    titulo.textContent = s.titulo;

    const tarjeta = document.createElement("div");
    tarjeta.className = "etapa-tarjeta";
    if (s.fotos && s.fotos.length) tarjeta.appendChild(crearGaleria(s.fotos, s.titulo));
    const texto = document.createElement("div");
    texto.className = "texto";
    parrafos(texto, s.texto);
    tarjeta.appendChild(texto);

    etapa.append(fecha, titulo, tarjeta);
    linea.appendChild(etapa);
  });

  /* ---------- Visor de fotos ---------- */
  const visor = $("#visor");
  function abrirVisor(src) {
    visor.querySelector("img").src = src;
    visor.hidden = false;
  }
  visor.addEventListener("click", () => { visor.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") visor.hidden = true; });

  /* ---------- Contador ---------- */
  function diferencia(desde, hasta) {
    let y = hasta.getFullYear() - desde.getFullYear();
    let m = hasta.getMonth() - desde.getMonth();
    let d = hasta.getDate() - desde.getDate();
    if (d < 0) {
      m--;
      d += new Date(hasta.getFullYear(), hasta.getMonth(), 0).getDate();
    }
    if (m < 0) { y--; m += 12; }
    const ancla = new Date(desde.getFullYear() + y, desde.getMonth() + m, desde.getDate() + d);
    const resto = Math.max(0, Math.floor((hasta - ancla) / 1000));
    return { y, m, d, h: Math.floor(resto / 3600), min: Math.floor(resto / 60) % 60, s: resto % 60 };
  }

  const dosDigitos = (n) => String(n).padStart(2, "0");

  function actualizarContador() {
    const n = ahora();
    if (n < INICIO) return;
    const t = diferencia(INICIO, n);
    $("#c-anios").textContent = t.y;
    $("#c-meses").textContent = t.m;
    $("#c-dias").textContent = t.d;
    $("#c-horas").textContent = dosDigitos(t.h);
    $("#c-min").textContent = dosDigitos(t.min);
    $("#c-seg").textContent = dosDigitos(t.s);

    const total = Math.floor(
      (Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(iy, im - 1, id)) / 86400000
    );
    $("#c-total").textContent = total.toLocaleString("es");

    const aviso = $("#aviso");
    if (n.getDate() === INICIO.getDate()) {
      const esAniversario = n.getMonth() === INICIO.getMonth() && t.y > 0;
      aviso.textContent = esAniversario
        ? `¡Feliz ${t.y}° aniversario!`
        : "¡Feliz mes-aniversario!";
      aviso.hidden = false;
    } else {
      aviso.hidden = true;
    }
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* ---------- Corazones ---------- */
  const capa = $("#corazones");
  const SIMBOLOS = ["♥", "❤", "♡"];

  function corazonCayendo() {
    if (document.hidden) return;
    const c = document.createElement("span");
    c.className = "corazon";
    c.textContent = SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = 12 + Math.random() * 16 + "px";
    c.style.animationDuration = 7 + Math.random() * 6 + "s";
    c.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    c.style.setProperty("--rot", (Math.random() * 360 - 180) + "deg");
    c.addEventListener("animationend", () => c.remove());
    capa.appendChild(c);
  }

  function estallido(x, y) {
    for (let i = 0; i < 28; i++) {
      const c = document.createElement("span");
      c.className = "estallido";
      c.textContent = "♥";
      const ang = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 180;
      c.style.left = x + "px";
      c.style.top = y + "px";
      c.style.fontSize = 14 + Math.random() * 20 + "px";
      c.style.setProperty("--x", Math.cos(ang) * dist + "px");
      c.style.setProperty("--y", Math.sin(ang) * dist + "px");
      c.addEventListener("animationend", () => c.remove());
      capa.appendChild(c);
    }
  }

  if (!reducirMovimiento) setInterval(corazonCayendo, 800);

  /* ---------- Aparecer al hacer scroll ---------- */
  function observarRevelar() {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".revelar").forEach((el) => obs.observe(el));
  }

  /* ---------- Música ---------- */
  const audio = $("#audio");
  const botonMusica = $("#boton-musica");

  function estadoMusica() {
    const sonando = !audio.paused;
    botonMusica.classList.toggle("sonando", sonando);
    botonMusica.classList.toggle("pausado", !sonando);
    botonMusica.setAttribute("aria-label", sonando ? "Pausar música" : "Reproducir música");
  }

  function iniciarMusica() {
    if (!H.musica) return;
    audio.src = H.musica;
    audio.volume = 0.6;
    audio.play()
      .then(() => { botonMusica.hidden = false; estadoMusica(); })
      .catch(() => { /* sin archivo de música: el botón queda oculto */ });
  }

  botonMusica.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener("play", estadoMusica);
  audio.addEventListener("pause", estadoMusica);

  /* ---------- Abrir el sobre ---------- */
  const sobre = $("#sobre");
  sobre.addEventListener("click", () => {
    if (sobre.classList.contains("abierto")) return;
    sobre.classList.add("abierto");
    iniciarMusica();

    const r = sobre.getBoundingClientRect();
    setTimeout(() => estallido(r.left + r.width / 2, r.top + r.height / 3), reducirMovimiento ? 0 : 900);

    setTimeout(() => {
      $("#pantalla-sobre").classList.add("oculta");
      $("#historia").hidden = false;
      document.body.classList.remove("cerrado");
      window.scrollTo(0, 0);
      observarRevelar();
    }, reducirMovimiento ? 300 : 2400);
  });
})();
