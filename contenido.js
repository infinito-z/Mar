/*
 * ============================================================
 *  CONTENIDO DE LA PÁGINA — edita solo este archivo
 * ============================================================
 *  - Cambia los textos entre comillas.
 *  - Para fotos: copia tus imágenes a la carpeta "fotos/" y
 *    escribe aquí su nombre exacto (ej: "fotos/playa.jpg").
 *    Si una foto no existe, se muestra un recuadro "Tu foto aquí".
 *  - Para saltos de párrafo dentro del texto usa \n\n
 *  - Las comillas dentro de un texto van con \"  (ej: "dijo \"hola\"")
 * ============================================================
 */

const HISTORIA = {
  // Fecha en que empezó todo (año-mes-día)
  inicio: "2023-10-06",

  // Nombres que aparecen en la página
  ella: "Mi amor",
  yo: "Tu enamorado",

  // Texto del sobre
  sobre: "Para ti, mi amor",

  // Carta de bienvenida al abrir el sobre
  carta: {
    titulo: "Hola, mi vida",
    texto:
      "Preparé este pequeño rincón solo para ti.\n\n" +
      "Aquí guardé nuestra historia: cómo empezó, todo lo que hemos vivido y cada día que llevamos juntos.\n\n" +
      "Ponle volumen, desliza despacio y disfrútalo.",
    firma: "Con todo mi amor",
  },

  // Secciones de la historia (en orden)
  secciones: [
    {
      id: "conocimos",
      titulo: "Cómo nos conocimos",
      fecha: "Antes del 6 de octubre de 2023",
      texto:
        "Escribe aquí cómo se conocieron: dónde fue, qué pensaste la primera vez que la viste, " +
        "quién habló primero, algún detalle gracioso de ese día...",
      fotos: ["fotos/conocimos-1.jpg", "fotos/conocimos-2.jpg"],
    },
    {
      id: "inicio",
      titulo: "El inicio",
      fecha: "6 de octubre de 2023",
      texto:
        "Cuenta aquí cómo empezaron: el día que se hicieron enamorados, " +
        "qué se dijeron, cómo te sentiste...",
      fotos: ["fotos/inicio-1.jpg", "fotos/inicio-2.jpg", "fotos/inicio-3.jpg"],
    },
    {
      id: "anio1",
      titulo: "Nuestro primer año",
      fecha: "Octubre 2023 — Octubre 2024",
      texto:
        "Los primeros recuerdos juntos: primeras salidas, viajes, momentos especiales, " +
        "lo que aprendieron el uno del otro...",
      fotos: ["fotos/anio1-1.jpg", "fotos/anio1-2.jpg", "fotos/anio1-3.jpg"],
    },
    {
      id: "anio2",
      titulo: "Nuestro segundo año",
      fecha: "Octubre 2024 — Octubre 2025",
      texto:
        "Lo que vivieron en el segundo año: logros, retos superados juntos, " +
        "lugares nuevos, anécdotas...",
      fotos: ["fotos/anio2-1.jpg", "fotos/anio2-2.jpg", "fotos/anio2-3.jpg"],
    },
    {
      id: "anio3",
      titulo: "Nuestro tercer año",
      fecha: "Octubre 2025 — Octubre 2026",
      texto:
        "El tercer año: cómo han crecido como pareja, lo más bonito de este año " +
        "y lo que sueñas para lo que viene...",
      fotos: ["fotos/anio3-1.jpg", "fotos/anio3-2.jpg", "fotos/anio3-3.jpg"],
    },
  ],

  // Mensaje final
  cierre: {
    titulo: "Te amo",
    texto: "Y esto es solo el comienzo. Gracias por cada día a tu lado.",
  },

  // Música (pon tu canción en la carpeta musica/ con este nombre)
  musica: "musica/cancion.mp3",
};
