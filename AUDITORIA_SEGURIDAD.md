# Auditoría de Seguridad - TSP Rediseño

## Metadatos
- **Fecha:** 2026-09-25
- **Commit actual:** 2b37ed36e3d1310c2ae8e7acda8a26f089b88c67
- **Stack detectado:** Frontend estático (Vanilla HTML, CSS, JavaScript). No se detecta backend activo en este repositorio ni gestor de dependencias.

## Árbol de carpetas relevante
```text
.
├── .git/
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── pages/
│   ├── index.html
│   ├── nosotros.html
│   ├── servicios.html
│   ├── servicio-escolta.html
│   ├── servicio-guardias.html
│   ├── servicio-investigacion.html
│   ├── servicio-poligrafo.html
│   ├── sectores.html
│   └── casos.html
├── index.html (Redirección automática hacia pages/index.html)
├── LEEME.txt
└── .gitattributes
```

## Inventario de dependencias
- **Gestor de dependencias:** Ninguno (`package.json`, `requirements.txt` o similares están ausentes).
- **Dependencias declaradas:** No se utilizan frameworks o bibliotecas de terceros empaquetadas (todo es código nativo / Vanilla JS).

## Inventario de endpoints
Dado que es una aplicación estática, no hay endpoints de API manejados por un servidor de la aplicación en el código fuente.
- **Páginas estáticas expuestas:** `index.html`, `nosotros.html`, `servicios.html`, `sectores.html`, `casos.html`, entre otras.
- **Llamadas/Rutas externas:** 
  - El formulario de cotización es interceptado y redirige los datos a la API de WhatsApp (`wa.me`) como se verifica en `js/main.js`.
  - Redirecciones estáticas a `google.com/maps` y `mailto:`.

## Superficie de ataque detectada
- **Inyección del lado del cliente (XSS):** Riesgo bajo actual. La aplicación lee datos del formulario (`js/main.js`) y los envía a WhatsApp en lugar de manipular o reflejar dichos datos sin sanitizar directamente al DOM.
- **Exposición de información (Data Exposure):** No se manejan secretos (API Keys, contraseñas). La información en `js/main.js` contiene datos públicos de contacto (teléfono, ubicación, email), lo cual es intencional. No hay archivos de configuración de entorno (ej. `.env`).

## Controles de seguridad ya presentes
- **Mitigación de Reverse Tabnabbing:** Se utiliza `rel="noopener"` al abrir enlaces externos (`target="_blank"`) en la generación dinámica de HTML desde `js/main.js`.
- **Ausencia de estado y backend local:** La inexistencia de una base de datos o lógica de servidor mitiga por completo las inyecciones SQL o problemas en la gestión de sesiones en esta capa.

## Controles ausentes (lista preliminar)
- **Cabeceras de Seguridad HTTP (Security Headers):** Debido a que no hay archivo de configuración del servidor (ej. Nginx, Apache), no hay evidencia de CSP, HSTS, X-Frame-Options, ni X-Content-Type-Options. Esto dependerá netamente del entorno de alojamiento.
- **Protección contra Spam/Bots (Captcha/Rate-limit):** Al depender del envío al cliente local de WhatsApp en `js/main.js`, no se implementan validaciones que prevengan el abuso automatizado por parte de un atacante desde un script de navegador.
- **Testing y CI/CD de Seguridad:** Ausencia de pruebas (Unitarias, E2E), linters, SAST u otras validaciones de calidad de código en la ruta raíz.

## Próximos pasos sugeridos
1. **Definición del entorno de alojamiento:** Crear un archivo de configuración (`nginx.conf` o `_headers` dependiendo del proveedor) e implementar las cabeceras de seguridad web esenciales, particularmente `Content-Security-Policy`.
2. **Hardening de Formularios:** Evaluar si en el futuro se implementará un servidor para evitar depender del redireccionamiento a WhatsApp en el cliente, de manera que se puedan añadir validaciones por el lado del servidor y reCAPTCHA/rate-limiting.
3. **Integración Continua:** Agregar revisiones básicas de linting y formateo de código JS/CSS para identificar vulnerabilidades client-side.
