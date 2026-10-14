/* TS&P — Propuesta de rediseño · JS compartido
   Inyecta header/footer (así se editan en un solo lugar), íconos SVG,
   menú móvil, animaciones de entrada y el formulario de cotización → WhatsApp. */

(function () {
  "use strict";

  /* ---------- Datos de contacto (editar aquí) ---------- */
  var SITE = {
    phone: "02 2 558 424",
    phoneHref: "+59322558424",
    whatsapp: "098 339 3462",
    whatsappNumber: "593983393462",
    email: "info@tspseguridadprivada.com",
    address: "Reina Victoria y Av. Colón, esquina. Edif. Banco de Guayaquil, Of. 1003",
    city: "Quito, Ecuador",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Edificio Banco de Guayaquil Reina Victoria y Av. Colón Quito"),
    hours: "Atención 24/7 · Oficina: lunes a viernes"
  };
  var WA_BASE = "https://wa.me/" + SITE.whatsappNumber;

  /* ---------- Íconos (trazo, 24x24) ---------- */
  var ICONS = {
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"/>',
    "shield-check": '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.5c2.5 0 4.5 1.8 4.5 4.5"/>',
    activity: '<path d="M3 12h4l2.5-7 4 14 2.5-7H21"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    bank: '<path d="M3 9l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11l2-8H6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z"/>',
    hardhat: '<path d="M3 17h18M5 17a7 7 0 0114 0M12 6v5"/>',
    factory: '<path d="M3 21V11l6 4V11l6 4V7h4v14H3z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    "chevron-right": '<path d="M9 6l6 6-6 6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 000-6H9a3 3 0 010-6h7"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    car: '<path d="M4 16v-4l2-5h12l2 5v4M4 16h16M4 16v2h3v-2M17 16v2h3v-2"/><circle cx="8" cy="13" r=".8"/><circle cx="16" cy="13" r=".8"/>',
    camera: '<path d="M3 8h12v8H3zM15 11l6-3v8l-6-3"/>',
    graduation: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
    whatsapp: '<path d="M3 21l1.6-4.8A9 9 0 1112 21a9 9 0 01-4.2-1L3 21z"/><path d="M9 8.5c0 3.3 2.7 6 6 6l1.2-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M7.5 7.5a6 6 0 000 9M16.5 7.5a6 6 0 010 9M4.5 4.5a10 10 0 000 15M19.5 4.5a10 10 0 010 15"/>'
  };

  function svg(name, extra) {
    var body = ICONS[name] || ICONS.shield;
    return '<svg class="icon' + (extra ? " " + extra : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + body + "</svg>";
  }

  var BRAND_MARK =
    '<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true">' +
    '<path d="M24 3l17 6v13c0 11-7.5 19-17 23C14.5 41 7 33 7 22V9z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M15 17.5h18M24 17.5V34" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/></svg>';

  var inPages = /\/pages\/|\\pages\\/.test(window.location.pathname) || window.location.href.indexOf("/pages/") !== -1 || window.location.href.indexOf("\\pages\\") !== -1;
  var pfx = inPages ? "" : "pages/";

  function brand() {
    return '<a class="brand" href="' + pfx + 'index.html" aria-label="TS&P — Inicio">' + BRAND_MARK +
      '<span class="brand-text"><strong>TS<span>&amp;</span>P</strong><small>Total Security &amp; Protection</small></span></a>';
  }

  /* ---------- Header ---------- */
  var page = document.body.getAttribute("data-page") || "";
  function active(key) { return page === key ? " active" : ""; }

  var headerHTML =
    '<div class="topbar"><div class="container">' +
      '<ul>' +
        '<li>' + svg("phone") + '<a href="tel:' + SITE.phoneHref + '">' + SITE.phone + '</a></li>' +
        '<li>' + svg("whatsapp") + '<a href="' + WA_BASE + '" target="_blank" rel="noopener">' + SITE.whatsapp + '</a></li>' +
        '<li class="hide-md">' + svg("mail") + '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>' +
      '</ul>' +
      '<ul class="hide-md"><li>' + svg("clock") + SITE.hours + '</li></ul>' +
    '</div></div>' +
    '<header class="site-header"><div class="container">' + brand() +
      '<button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">' + svg("menu") + '</button>' +
      '<nav class="nav" id="nav" aria-label="Principal"><ul>' +
        '<li><a class="nav-link' + active("inicio") + '" href="' + pfx + 'index.html">Inicio</a></li>' +
        '<li><a class="nav-link' + active("nosotros") + '" href="' + pfx + 'nosotros.html">Nosotros</a></li>' +
        '<li class="has-sub"><a class="nav-link' + active("servicios") + '" href="' + pfx + 'servicios.html">Servicios ' + svg("chevron") + '</a>' +
          '<div class="submenu">' +
            '<a href="' + pfx + 'servicio-guardias.html">' + svg("shield-check") + 'Guardias de seguridad</a>' +
            '<a href="' + pfx + 'servicio-escolta.html">' + svg("user") + 'Escolta y protección personal</a>' +
            '<a href="' + pfx + 'servicio-poligrafo.html">' + svg("activity") + 'Evaluación de confianza (polígrafo)</a>' +
            '<a href="' + pfx + 'servicio-investigacion.html">' + svg("search") + 'Investigaciones privadas</a>' +
          '</div></li>' +
        '<li><a class="nav-link' + active("sectores") + '" href="' + pfx + 'sectores.html">Sectores</a></li>' +
        '<li><a class="nav-link' + active("casos") + '" href="' + pfx + 'casos.html">Casos y testimonios</a></li>' +
      '</ul>' +
      '<a class="btn btn-primary btn-sm" href="' + WA_BASE + '?text=' + encodeURIComponent("Hola TS&P, quisiera solicitar una cotización.") + '" target="_blank" rel="noopener">' + svg("whatsapp") + 'Cotizar</a>' +
      '</nav></div></header>';

  /* ---------- Footer ---------- */
  var footerHTML =
    '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div>' + brand() +
          '<p style="max-width:26em;font-size:.92rem">Con una sólida trayectoria en seguridad e investigaciones, velamos por tu tranquilidad, la de tu familia y la de tu empresa.</p>' +
        '</div>' +
        '<div><h4>Servicios</h4><ul>' +
          '<li><a href="' + pfx + 'servicio-guardias.html">Guardias de seguridad</a></li>' +
          '<li><a href="' + pfx + 'servicio-escolta.html">Escolta y protección personal</a></li>' +
          '<li><a href="' + pfx + 'servicio-poligrafo.html">Evaluación de confianza</a></li>' +
          '<li><a href="' + pfx + 'servicio-investigacion.html">Investigaciones privadas</a></li>' +
        '</ul></div>' +
        '<div><h4>Empresa</h4><ul>' +
          '<li><a href="' + pfx + 'nosotros.html">Nosotros</a></li>' +
          '<li><a href="' + pfx + 'sectores.html">Sectores que protegemos</a></li>' +
          '<li><a href="' + pfx + 'casos.html">Casos y testimonios</a></li>' +
          '<li><a href="' + pfx + 'index.html#cotizar">Solicitar cotización</a></li>' +
        '</ul></div>' +
        '<div><h4>Contacto</h4><ul class="contact-mini">' +
          '<li>' + svg("pin") + '<a href="' + SITE.mapsUrl + '" target="_blank" rel="noopener">' + SITE.address + '<br>' + SITE.city + '</a></li>' +
          '<li>' + svg("phone") + '<a href="tel:' + SITE.phoneHref + '">' + SITE.phone + '</a></li>' +
          '<li>' + svg("whatsapp") + '<a href="' + WA_BASE + '" target="_blank" rel="noopener">' + SITE.whatsapp + '</a></li>' +
          '<li>' + svg("mail") + '<a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© <span id="year"></span> TS&amp;P Total Security &amp; Protection. Todos los derechos reservados.</span>' +
      '<span>Propuesta de rediseño · prototipo</span></div>' +
    '</div></footer>' +
    '<a class="wa-float" href="' + WA_BASE + '?text=' + encodeURIComponent("Hola TS&P, necesito información sobre sus servicios.") + '" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">' + svg("whatsapp") + '<span>Escríbenos</span></a>';

  var hSlot = document.getElementById("site-header");
  var fSlot = document.getElementById("site-footer");
  if (hSlot) hSlot.innerHTML = headerHTML;
  if (fSlot) fSlot.innerHTML = footerHTML;

  /* ---------- Reemplazar <i data-icon="..."> por SVG ---------- */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var tmp = document.createElement("span");
    tmp.innerHTML = svg(el.getAttribute("data-icon"), el.getAttribute("data-class") || "");
    el.replaceWith(tmp.firstChild);
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = svg(open ? "close" : "menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        document.body.style.overflow = "";
        toggle.innerHTML = svg("menu");
      }
    });
  }

  /* ---------- Animación de entrada ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Brillo que sigue al cursor en tarjetas ---------- */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- Formulario de cotización → WhatsApp ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = [
        "Hola TS&P, quisiera una cotización.",
        "",
        "Nombre: " + (d.get("nombre") || "-"),
        "Empresa/Lugar: " + (d.get("empresa") || "-"),
        "Servicio: " + (d.get("servicio") || "-"),
        "Teléfono: " + (d.get("telefono") || "-"),
        "Detalle: " + (d.get("detalle") || "-")
      ];
      window.open(WA_BASE + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }
})();
