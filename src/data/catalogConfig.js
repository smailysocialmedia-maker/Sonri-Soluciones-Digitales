/**
 * ==============================================================================
 * SONRI SOLUCIONES DIGITALES — CONFIGURACIÓN CENTRAL DEL CATÁLOGO
 * ==============================================================================
 * REGLA DE NEGOCIO: Cada servicio tiene 1 solo precio unificado tomando
 * como costo base el MÁS ALTO de los proveedores para garantizar la rentabilidad.
 * ==============================================================================
 */

// Helper para calcular precio de venta a partir del costo neto y % de ganancia
function calcSalePrice(costNeto, marginPct = 40) {
  if (!costNeto || isNaN(costNeto)) return 0;
  const raw = Number(costNeto) * (1 + Number(marginPct) / 100);
  return Math.round(raw / 50) * 50;
}

const CATALOG_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. DATOS DE CONTACTO Y MARCA OFICIALES
  // ----------------------------------------------------------------------------
  brandName: "Sonri Soluciones Digitales",
  tagline: "Todo tu entretenimiento, herramientas Pro e impulso digital en un solo lugar",
  subtagline: "Activación inmediata • Soporte 24/7 garantizado • Pago por transferencia a convenir",

  // CONTACTOS OFICIALES DEL CLIENTE
  whatsappNumber: "5492634377019",
  whatsappFormatted: "+54 9 263 437-7019",
  instagramUser: "@sonrisas182",
  instagramUrl: "https://instagram.com/sonrisas182",

  // Clave PIN para ingresar al Panel de Administrador (Oculto)
  adminPin: "1234",

  // Margen de ganancia general por defecto (en porcentaje)
  defaultProfitMargin: 40,

  // true = muestra precios en la web; false = modo cotización por privado
  showPrices: true,
  currencySymbol: "$",
  paymentMethodText: "Transferencia bancaria / Billeteras virtuales (A convenir)",

  // ----------------------------------------------------------------------------
  // 2. CATEGORÍAS PRINCIPALES
  // ----------------------------------------------------------------------------
  categories: [
    {
      id: "streaming",
      name: "Streaming & Cine",
      shortName: "Streaming",
      icon: "Film",
      badge: "Cuentas Premium 4K",
      description: "Cuentas y perfiles privados en Ultra HD 4K con máxima estabilidad y sin cortes."
    },
    {
      id: "creadores-ia",
      name: "Herramientas & IA",
      shortName: "Herramientas IA",
      icon: "Sparkles",
      badge: "Productividad Pro",
      description: "Software profesional, inteligencia artificial de punta y bibliotecas de cursos."
    },
    {
      id: "conectividad",
      name: "Conectividad & Datos",
      shortName: "Internet Móvil",
      icon: "Wifi",
      badge: "Ilimitado",
      description: "Conexión a internet ilimitada mediante aplicaciones seguras para tu celular."
    },
    {
      id: "iptv",
      name: "Televisión Digital & IPTV",
      shortName: "TV & Fútbol",
      icon: "Tv",
      badge: "Fútbol Libre & Canales",
      description: "Canales en vivo, Pack Fútbol HD, series y cine a demanda sin interrupciones."
    },
    {
      id: "smm",
      name: "Crecimiento en Redes (SMM)",
      shortName: "Crecimiento SMM",
      icon: "TrendingUp",
      badge: "Sin Contraseñas",
      description: "Seguidores, vistas, likes y reproducción para escalar tus redes sociales."
    }
  ],

  // ----------------------------------------------------------------------------
  // 3. CONSTRUCTOR DE COMBOS DE STREAMING (Costo base más alto: $16.000 ARS)
  // ----------------------------------------------------------------------------
  comboPlatforms: [
    { id: "netflix", name: "Netflix Premium 4K", icon: "Flame" },
    { id: "disney", name: "Disney+ Premium", icon: "Sparkles" },
    { id: "prime", name: "Prime Video HD", icon: "PlaySquare" },
    { id: "max", name: "Max (HBO) 4K", icon: "Clapperboard" },
    { id: "crunchyroll", name: "Crunchyroll Mega Fan", icon: "Zap" },
    { id: "paramount", name: "Paramount+", icon: "Star" },
    { id: "universal", name: "Universal+", icon: "Compass" },
    { id: "vix", name: "ViX+ Premium", icon: "Tv" },
    { id: "apple", name: "Apple TV+", icon: "Monitor" },
    { id: "spotify", name: "Spotify Premium", icon: "Music2" },
    { id: "viki", name: "Viki Rakuten (K-Dramas)", icon: "Heart" }
  ],

  comboTiers: [
    { count: 2, label: "Combo Dúo (2 Plataformas)", costPrice: 11000, margin: 40, price: calcSalePrice(11000, 40), tag: "Ahorro Especial" },
    { count: 3, label: "Combo Trío (3 Plataformas)", costPrice: 16000, margin: 38, price: calcSalePrice(16000, 38), tag: "Más Elegido 🔥" },
    { count: 4, label: "Combo Master (4 Plataformas)", costPrice: 20500, margin: 36, price: calcSalePrice(20500, 36), tag: "Mejor Precio ⚡" }
  ],

  // ----------------------------------------------------------------------------
  // 4. INVENTARIO UNIFICADO (1 SOLO PRECIO POR SERVICIO - COSTO MÁS ALTO)
  // ----------------------------------------------------------------------------
  products: [
    // --------------------------------------------------------------------------
    // PILAR 1: STREAMING & CINE EN CASA (1 precio por servicio)
    // --------------------------------------------------------------------------
    {
      id: "combo-streaming-personalizado",
      name: "Combos de Entretenimiento a Elección",
      category: "streaming",
      badge: "Super Promo",
      highlight: true,
      isSpecialCombo: true,
      costPrice: 16000,
      margin: 38,
      price: calcSalePrice(16000, 38),
      period: "30 días",
      icon: "Layers",
      gradient: "from-cyan-500 via-blue-600 to-purple-600",
      description: "Armá tu propio pack personalizado combinando 2, 3 o 4 plataformas favoritas a un precio promocional insuperable.",
      benefits: [
        "Elegí entre Netflix, Disney+, Prime, Max, Crunchyroll, Spotify y más",
        "Perfiles privados con PIN personal en Ultra HD 4K",
        "Garantía total de reposición y soporte durante todo el mes",
        "Activación rápida en minutos"
      ]
    },
    {
      id: "netflix-premium",
      name: "Netflix Premium 4K",
      category: "streaming",
      badge: "Más Pedido",
      // Costo más alto de proveedor: 8.000 ARS
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días",
      icon: "Film",
      gradient: "from-red-600 to-purple-800",
      description: "Acceso con perfil privado y PIN de seguridad en Ultra HD 4K + HDR. Cero caídas y sin cortes por geolocalización.",
      benefits: [
        "Calidad Ultra HD 4K + HDR",
        "Perfil privado exclusivo con PIN propio",
        "Sin bloqueos ni caídas con máxima estabilidad",
        "Activación rápida y soporte 30 días garantizado"
      ]
    },
    {
      id: "disney-plus-premium",
      name: "Disney+ Premium",
      category: "streaming",
      badge: "Deportes ESPN",
      // Costo más alto de proveedor mensual: 6.400 ARS
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días",
      icon: "Sparkles",
      gradient: "from-blue-600 to-indigo-900",
      description: "Catálogo completo de Disney, Pixar, Marvel, Star Wars y todos los eventos y partidos en vivo de ESPN.",
      benefits: [
        "Todos los partidos y deportes en vivo de ESPN",
        "Catálogo completo en resolución 4K UHD",
        "Sin límites de contenido familiar y para adultos",
        "Compatible con Smart TV, celulares y consolas"
      ]
    },
    {
      id: "prime-video",
      name: "Prime Video",
      category: "streaming",
      badge: "Recomendado",
      // Costo más alto de proveedor: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "PlaySquare",
      gradient: "from-sky-500 to-blue-700",
      description: "Estrenos cinematográficos exclusivos, series originales galardonadas y contenido en alta definición.",
      benefits: [
        "Resolución Full HD y 4K",
        "Descargas para ver sin conexión a internet",
        "Acceso directo y perfiles estables",
        "Soporte prioritario durante tu suscripción"
      ]
    },
    {
      id: "max-hbo",
      name: "Max (HBO Max)",
      category: "streaming",
      badge: "Cine Taquillero",
      // Costo más alto de proveedor: 3.200 ARS
      costPrice: 3200,
      margin: 40,
      price: calcSalePrice(3200, 40),
      period: "30 días",
      icon: "Clapperboard",
      gradient: "from-purple-600 to-blue-800",
      description: "Las mejores películas de Warner Bros, sagas icónicas, series multipremiadas y eventos deportivos.",
      benefits: [
        "Estrenos directos de cine a tu pantalla",
        "Transmisiones deportivas de primer nivel",
        "Calidad 4K con Dolby Vision",
        "Activación al instante"
      ]
    },
    {
      id: "crunchyroll-mega-fan",
      name: "Crunchyroll Mega Fan",
      category: "streaming",
      badge: "Anime Simulcast",
      // Costo más alto de proveedor: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Zap",
      gradient: "from-amber-500 to-orange-700",
      description: "La biblioteca de anime más grande del mundo sin anuncios. Episodios disponibles 1 hora después de Japón.",
      benefits: [
        "Episodios estreno en simultáneo con Japón (Simulcast)",
        "Doblajes latinos y subtítulos en alta definición",
        "Visualización sin conexión y sin anuncios",
        "Audio en alta fidelidad y modo Mega Fan"
      ]
    },
    {
      id: "paramount-plus",
      name: "Paramount+",
      category: "streaming",
      badge: "Series & Cine",
      // Costo más alto de proveedor: 4.000 ARS
      costPrice: 4000,
      margin: 40,
      price: calcSalePrice(4000, 40),
      period: "30 días",
      icon: "Star",
      gradient: "from-blue-700 to-indigo-900",
      description: "Grandes éxitos de Paramount Pictures, series originales exclusivas, realities y deportes en vivo.",
      benefits: [
        "Grandes sagas de acción y clásicos del cine",
        "Contenido de Showtime y MTV",
        "Reproducción fluida en Smart TV y móviles",
        "Garantía de servicio garantizada"
      ]
    },
    {
      id: "universal-plus",
      name: "Universal+",
      category: "streaming",
      badge: "Estrenos Premium",
      // Costo más alto de proveedor: 4.000 ARS
      costPrice: 4000,
      margin: 40,
      price: calcSalePrice(4000, 40),
      period: "30 días",
      icon: "Compass",
      gradient: "from-cyan-600 to-teal-800",
      description: "Señales premium de Universal Cinema, Crime, Comedy, Premiere y Reality sin cortes publicitarios.",
      benefits: [
        "Las mejores franquicias de Universal",
        "Múltiples canales premium en directo",
        "Excelente calidad de video sin interrupciones",
        "Soporte permanente"
      ]
    },
    {
      id: "vix-premium",
      name: "ViX+ Premium",
      category: "streaming",
      badge: "100% en Español",
      // Costo más alto de proveedor: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Tv",
      gradient: "from-orange-600 to-red-800",
      description: "El mayor contenido en español: novelas completas, cine latino, series originales y partidos en vivo.",
      benefits: [
        "Fútbol y ligas en vivo en idioma español",
        "Producciones originales exclusivas",
        "Acceso directo y perfiles optimizados",
        "Soporte rápido vía WhatsApp"
      ]
    },
    {
      id: "apple-tv-plus",
      name: "Apple TV + MLS",
      category: "streaming",
      badge: "Máxima Calidad 4K",
      // Costo: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Monitor",
      gradient: "from-slate-600 to-zinc-900",
      description: "Producciones galardonadas en 4K con Dolby Vision y acceso a partidos de la Major League Soccer.",
      benefits: [
        "Incluye partidos de la MLS en directo",
        "Bitrate de video ultra alto con Dolby Vision & Atmos",
        "Compatible con Android, Smart TV y dispositivos Apple",
        "Sin publicidad ni limitaciones"
      ]
    },
    {
      id: "viki-rakuten",
      name: "Viki Rakuten (Pass Plus)",
      category: "streaming",
      badge: "K-Dramas & Asia",
      // Costo: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Heart",
      gradient: "from-pink-600 to-rose-900",
      description: "El catálogo definitivo de K-Dramas coreanos, dramas asiáticos, películas y programas de variedades subtitulados.",
      benefits: [
        "Acceso exclusivo a producciones Viki Originals",
        "Subtítulos en español profesionales",
        "Calidad Full HD sin interrupciones",
        "Visualización en múltiples dispositivos"
      ]
    },
    {
      id: "spotify-premium",
      name: "Spotify Premium",
      category: "streaming",
      badge: "Música Sin Límites",
      // Costo: 6.400 ARS
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días",
      icon: "Music2",
      gradient: "from-emerald-500 to-teal-800",
      description: "Música sin anuncios, reproducción aleatoria libre, descargas offline y máxima calidad de audio.",
      benefits: [
        "Sin interrupciones comerciales",
        "Descarga de canciones y podcasts offline",
        "Audio en calidad extrema (320 kbps)",
        "Compatible con todos tus dispositivos"
      ]
    },
    {
      id: "youtube-premium-music",
      name: "YouTube Premium + Music",
      category: "streaming",
      badge: "Sin Anuncios",
      // Costo más alto de proveedor: 5.440 ARS
      costPrice: 5440,
      margin: 40,
      price: calcSalePrice(5440, 40),
      period: "30 días",
      icon: "PlaySquare",
      gradient: "from-red-600 to-pink-700",
      description: "Todo YouTube sin anuncios en tu Smart TV y celular, reproducción en segundo plano y YouTube Music Premium.",
      benefits: [
        "Cero publicidad en YouTube y YouTube Music",
        "Reproducción con pantalla apagada en celulares",
        "Descargas para ver y escuchar sin internet",
        "Activación en tu cuenta con garantía total"
      ]
    },
    {
      id: "deezer-premium",
      name: "Deezer Premium",
      category: "streaming",
      badge: "Audio HiFi",
      // Costo: 4.800 ARS
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Radio",
      gradient: "from-purple-600 to-indigo-800",
      description: "Millones de pistas musicales con calidad de sonido High Fidelity (FLAC) sin pérdida.",
      benefits: [
        "Sonido HiFi de alta fidelidad sin compresión",
        "Modo sin conexión a internet",
        "Flow personalizado según tus gustos",
        "Sin publicidad"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 2: HERRAMIENTAS PARA CREADORES & IA (1 precio por servicio)
    // --------------------------------------------------------------------------
    {
      id: "capcut-pro",
      name: "CapCut Pro Team",
      category: "creadores-ia",
      badge: "Top Creadores",
      // Costo más alto de proveedor: 11.200 ARS
      costPrice: 11200,
      margin: 40,
      price: calcSalePrice(11200, 40),
      period: "30 días",
      icon: "Video",
      gradient: "from-teal-500 to-cyan-800",
      description: "Desbloqueá todo el potencial del editor #1 de TikTok y Reels. Subtítulos automáticos bilingües y exportación 4K limpia.",
      benefits: [
        "Subtítulos automáticos inteligentes con estilos Pro",
        "Exportación en 4K a 60 FPS sin marca de agua",
        "Efectos de voz, tracking y filtros avanzados",
        "Compatible con PC, Mac, iPhone y Android"
      ]
    },
    {
      id: "canva-pro-educacion",
      name: "Canva Pro Educación",
      category: "creadores-ia",
      badge: "Indispensable",
      // Costo más alto de proveedor: 3.200 ARS
      costPrice: 3200,
      margin: 60,
      price: calcSalePrice(3200, 60),
      period: "30 días",
      icon: "Palette",
      gradient: "from-cyan-500 to-blue-600",
      description: "Acceso completo e ilimitado a plantillas premium, quitafondo con un clic y kit de marcas en tu cuenta.",
      benefits: [
        "Se activa directo en tu propio correo personal",
        "Herramienta Quitafondos instantánea en 1 clic",
        "Millones de fotos, videos, fuentes y audios Pro",
        "Redimensionamiento mágico para todas las redes"
      ]
    },
    {
      id: "chatgpt-plus",
      name: "ChatGPT Plus (GPT-4o)",
      category: "creadores-ia",
      badge: "IA Avanzada",
      // Costo más alto de proveedor: 14.400 ARS
      costPrice: 14400,
      margin: 40,
      price: calcSalePrice(14400, 40),
      period: "30 días",
      icon: "Bot",
      gradient: "from-emerald-500 to-teal-800",
      description: "Acceso a los modelos más avanzados de OpenAI: análisis profundo de datos, generación de imágenes con DALL·E y navegación.",
      benefits: [
        "Modelos GPT-4o y razonamiento avanzado",
        "Generación y edición de imágenes en alta resolución",
        "Análisis de archivos Excel, PDFs y código fuente",
        "Tiempos de respuesta ultra rápidos y sin esperas"
      ]
    },
    {
      id: "gemini-pro-cloud",
      name: "Gemini Pro / 18 Meses + 5 TB + YouTube",
      category: "creadores-ia",
      badge: "Plan Extendido",
      // Costo: 43.200 ARS
      costPrice: 43200,
      margin: 35,
      price: calcSalePrice(43200, 35),
      period: "550 días",
      icon: "Cpu",
      gradient: "from-blue-600 via-indigo-600 to-purple-800",
      description: "La suite definitiva: IA avanzada de Google por 18 meses, 5 TB de almacenamiento en la nube y YouTube Premium.",
      benefits: [
        "Duración extendida de 550 días (18 meses)",
        "5 TB (5.000 GB) de almacenamiento en Google One",
        "Incluye YouTube Premium sin anuncios",
        "Ventana de contexto masiva para analizar libros y videos"
      ]
    },
    {
      id: "video-ia-pro",
      name: "Video IA Pro",
      category: "creadores-ia",
      badge: "Pase Anual 365d",
      // Costo: 11.200 ARS
      costPrice: 11200,
      margin: 40,
      price: calcSalePrice(11200, 40),
      period: "365 días",
      icon: "Wand2",
      gradient: "from-fuchsia-600 to-purple-900",
      description: "Generación avanzada de videos por inteligencia artificial, clonación de voz y avatares realistas con pase anual.",
      benefits: [
        "Licencia por 365 días completos",
        "Texto a video con movimiento cinemático",
        "Creación de avatares hablantes hiperrealistas",
        "Ideal para creadores de contenido y agencias"
      ]
    },
    {
      id: "retrojuegos-clasicos",
      name: "¡Volvé a jugar a los mejores clásicos! (+5000 Juegos)",
      category: "creadores-ia",
      badge: "Nostalgia Gamer",
      // Costo: 2.500 ARS
      costPrice: 2500,
      margin: 50,
      price: calcSalePrice(2500, 50),
      period: "30 días",
      icon: "Zap",
      gradient: "from-amber-500 to-orange-700",
      description: "Más de 5.000 títulos legendarios de PlayStation 1, Nintendo 64, Super Nintendo, Sega Genesis, Arcade y Game Boy.",
      benefits: [
        "Más de 5.000 juegos listos para jugar",
        "Compatible con PC, Smart TV y dispositivos Android",
        "Incluye emuladores configurados en español",
        "Soporte para mandos Bluetooth y USB"
      ]
    },
    {
      id: "mega-packs-cursos",
      name: "Mega Pack de Cursos Digitales",
      category: "creadores-ia",
      badge: "Biblioteca Completa",
      // Costo: 4.000 ARS
      costPrice: 4000,
      margin: 50,
      price: calcSalePrice(4000, 50),
      period: "30 días",
      icon: "BookOpen",
      gradient: "from-amber-600 to-rose-700",
      description: "Biblioteca masiva con cursos completos de edición, marketing digital, diseño gráfico, Meta Ads, e-commerce y negocios.",
      benefits: [
        "Cursos de Premiere, After Effects, Photoshop, Meta Ads",
        "Nube privada organizada por categorías",
        "Descarga ilimitada o visualización directa online",
        "Actualizaciones de material incluidas"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 3: CONECTIVIDAD & DATOS (Personal y Claro con costos más altos)
    // --------------------------------------------------------------------------
    {
      id: "internet-movil-ilimitado",
      name: "Internet Móvil Ilimitado",
      category: "conectividad",
      badge: "Gigas Ilimitados",
      highlight: true,
      hasCarrierSelector: true,
      // Costo base línea Personal: 7.040 ARS | Claro: 4.960 ARS
      costPrice: 7040,
      margin: 40,
      price: calcSalePrice(7040, 40),
      period: "30 días",
      icon: "Wifi",
      gradient: "from-cyan-500 to-blue-700",
      description: "Navegá sin gastar saldo ni tus gigas contratados mediante aplicaciones seguras de alta velocidad 4G/5G.",
      benefits: [
        "Compatible con líneas Personal y Claro",
        "Navegación de alta velocidad sin límites de consumo",
        "Configuración sencilla en 2 pasos mediante app segura",
        "Guía paso a paso y asistencia remota para instalarlo"
      ],
      carriers: ["Personal", "Claro"],
      carrierPricing: {
        "Personal": { costPrice: 7040, margin: 40, price: calcSalePrice(7040, 40) },
        "Claro": { costPrice: 4960, margin: 40, price: calcSalePrice(4960, 40) }
      }
    },

    // --------------------------------------------------------------------------
    // PILAR 4: TELEVISIÓN DIGITAL & IPTV (1 precio unificado por servicio)
    // --------------------------------------------------------------------------
    {
      id: "pack-tv-digital-futbol",
      name: "TV Digital Premium + Pack Fútbol",
      category: "iptv",
      badge: "Fútbol en Vivo HD",
      highlight: true,
      hasAppSelector: true,
      // Costo más alto de proveedor: 8.000 ARS (3 pantallas)
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-blue-600 via-indigo-700 to-cyan-500",
      description: "Más de 1.500 canales en vivo, Pack Fútbol Argentino e internacional, señales de cine, infantiles y deportes en HD.",
      benefits: [
        "Elegí tu aplicación preferida: Argentum, Lumix, Flujo TV o Argen TV",
        "Pack Fútbol completo (ESPN Premium y TNT Sports en Full HD)",
        "Más de 10.000 películas y series a demanda incluidas",
        "Compatible con Smart TV, TV Box, Fire Stick, PC y Celular"
      ],
      appOptions: ["Argentum", "Lumix", "Flujo TV", "Argen TV"]
    },
    {
      id: "directv-go",
      name: "DirecTV GO (DGO)",
      category: "iptv",
      badge: "Deportes DSPORTS",
      // Costo: 14.400 ARS
      costPrice: 14400,
      margin: 38,
      price: calcSalePrice(14400, 38),
      period: "30 días · 1 pantalla",
      icon: "Radio",
      gradient: "from-sky-600 to-blue-900",
      description: "La experiencia oficial de DGO: canales en vivo, señales exclusivas de DSPORTS y retroceso de programación en Full HD.",
      benefits: [
        "Señales exclusivas de DSPORTS con coberturas únicas",
        "Guía electrónica interactiva y retroceso de programación",
        "Alta estabilidad en servidores oficiales",
        "Calidad Full HD nítida sin caídas"
      ]
    },
    {
      id: "mio-tv",
      name: "Mio TV / La Tele que va con vos",
      category: "iptv",
      badge: "Señales Digitales",
      // Costo: 12.800 ARS
      costPrice: 12800,
      margin: 38,
      price: calcSalePrice(12800, 38),
      period: "30 días · 1 pantalla",
      icon: "MonitorPlay",
      gradient: "from-indigo-600 to-purple-800",
      description: "Excelente alternativa con programación variada, canales de aire, cable y deportes para Smart TV y Android.",
      benefits: [
        "Interfaz ligera y rápida ideal para Smart TVs",
        "Canales nacionales e internacionales en vivo",
        "Alta estabilidad de transmisión",
        "Soporte y guía de conexión paso a paso"
      ]
    },
    {
      id: "plex-tv-multimedia",
      name: "Plex TV Multimedia Server",
      category: "iptv",
      badge: "Cine & Series HD",
      // Costo: 2.400 ARS
      costPrice: 2400,
      margin: 50,
      price: calcSalePrice(2400, 50),
      period: "30 días · 1 pantalla",
      icon: "HardDrive",
      gradient: "from-amber-600 to-yellow-700",
      description: "Servidor privado con miles de películas de estreno y series completas en la más alta calidad audiovisual a demanda.",
      benefits: [
        "Catálogo masivo sin límite de horas de visualización",
        "Calidad original 4K y 1080p con subtítulos y doblajes",
        "Organización estilo Netflix con sinopsis y trailers",
        "Compatible con todas las aplicaciones oficiales de Plex"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 5: CRECIMIENTO EN REDES (SMM)
    // --------------------------------------------------------------------------
    {
      id: "smm-crecimiento-redes",
      name: "Crecimiento en Redes Sociales (SMM)",
      category: "smm",
      badge: "100% Seguro • Sin Contraseña",
      highlight: true,
      isSpecialSMM: true,
      costPrice: 760,
      margin: 60,
      price: calcSalePrice(760, 60),
      period: "por paquete",
      icon: "TrendingUp",
      gradient: "from-cyan-400 via-purple-600 to-pink-600",
      description: "Impulsá tu presencia digital, perfil de negocio o marca personal con seguidores reales, vistas, likes y comentarios seguros.",
      benefits: [
        "NUNCA solicitamos tu contraseña: solo tu @usuario o link de publicación",
        "Servidores de alta calidad con entrega gradual y natural",
        "Servicios para Instagram, Facebook, YouTube, TikTok y WhatsApp",
        "Mejora tu prueba social, credibilidad y alcance orgánico"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. BASE DE DATOS SMM CON COSTOS NETOS EXACTOS POR 1.000
  // ----------------------------------------------------------------------------
  smmData: {
    instagram: {
      name: "Instagram",
      icon: "Instagram",
      color: "from-pink-500 to-purple-600",
      services: [
        {
          id: "ig-vistas",
          name: "Vistas Reels / Vídeo / IGTV",
          description: "Multiplicá las reproducciones para posicionar tus videos en la sección 'Explorar'.",
          costPer1000: 151,
          margin: 100,
          options: [
            { id: "ig-vis-1000", count: 1000, label: "1.000 Vistas Reels", costPrice: 151, margin: 150, price: calcSalePrice(151, 150) },
            { id: "ig-vis-5000", count: 5000, label: "5.000 Vistas Reels", costPrice: 755, margin: 120, price: calcSalePrice(755, 120), popular: true },
            { id: "ig-vis-10000", count: 10000, label: "10.000 Vistas Reels", costPrice: 1510, margin: 100, price: calcSalePrice(1510, 100) },
            { id: "ig-vis-50000", count: 50000, label: "50.000 Vistas Virales", costPrice: 7550, margin: 80, price: calcSalePrice(7550, 80) }
          ]
        },
        {
          id: "ig-likes",
          name: "Me Gusta / Likes",
          description: "Impulso instantáneo para tus publicaciones, fotos y carruseles.",
          costPer1000: 760,
          margin: 60,
          options: [
            { id: "ig-like-500", count: 500, label: "500 Likes Globales", costPrice: 380, margin: 80, price: calcSalePrice(380, 80) },
            { id: "ig-like-1000", count: 1000, label: "1.000 Likes Globales", costPrice: 760, margin: 60, price: calcSalePrice(760, 60), popular: true },
            { id: "ig-like-latam-1000", count: 1000, label: "1.000 Likes América Latina", costPrice: 2383, margin: 50, price: calcSalePrice(2383, 50) },
            { id: "ig-like-arg-1000", count: 1000, label: "1.000 Likes Argentinos 🇦🇷", costPrice: 8256, margin: 40, price: calcSalePrice(8256, 40) }
          ]
        },
        {
          id: "ig-comentarios",
          name: "Comentarios Personalizados",
          description: "Comentarios 100% redactados por vos para generar interacción real en tus posts.",
          costPer1000: 60480,
          margin: 45,
          options: [
            { id: "ig-com-10", count: 10, label: "10 Comentarios Personalizados", costPrice: 605, margin: 60, price: calcSalePrice(605, 60) },
            { id: "ig-com-25", count: 25, label: "25 Comentarios Personalizados", costPrice: 1512, margin: 55, price: calcSalePrice(1512, 55), popular: true },
            { id: "ig-com-50", count: 50, label: "50 Comentarios Personalizados", costPrice: 3024, margin: 50, price: calcSalePrice(3024, 50) }
          ]
        },
        {
          id: "ig-vivos",
          name: "Espectadores para Transmisión en Vivo",
          description: "Mantené tu transmisión con audiencia activa para atraer más personas orgánicas.",
          costPer1000: 25402,
          margin: 45,
          options: [
            { id: "ig-vivo-15m-100", count: 100, label: "100 Espectadores (15 Minutos)", costPrice: 2540, margin: 50, price: calcSalePrice(2540, 50) },
            { id: "ig-vivo-60m-100", count: 100, label: "100 Espectadores (60 Minutos)", costPrice: 8090, margin: 45, price: calcSalePrice(8090, 45), popular: true },
            { id: "ig-vivo-120m-100", count: 100, label: "100 Espectadores (120 Minutos)", costPrice: 11970, margin: 40, price: calcSalePrice(11970, 40) },
            { id: "ig-vivo-360m-100", count: 100, label: "100 Espectadores (360 Minutos)", costPrice: 23115, margin: 40, price: calcSalePrice(23115, 40) }
          ]
        },
        {
          id: "ig-miembros-canal",
          name: "Miembros de Canal de Instagram",
          description: "Sumá miembros a tu canal de difusión para que luzca activo y masivo.",
          costPer1000: 8078,
          margin: 45,
          options: [
            { id: "ig-chan-500", count: 500, label: "500 Miembros de Canal", costPrice: 4039, margin: 50, price: calcSalePrice(4039, 50) },
            { id: "ig-chan-1000", count: 1000, label: "1.000 Miembros de Canal", costPrice: 8078, margin: 45, price: calcSalePrice(8078, 45), popular: true }
          ]
        }
      ]
    },
    facebook: {
      name: "Facebook",
      icon: "Facebook",
      color: "from-blue-600 to-indigo-800",
      services: [
        {
          id: "fb-seguidores",
          name: "Seguidores de Página / Perfil",
          description: "Hacé crecer tu fan page de negocio o tu perfil público.",
          costPer1000: 1008,
          margin: 60,
          options: [
            { id: "fb-seg-1000", count: 1000, label: "1.000 Seguidores Globales", costPrice: 1008, margin: 70, price: calcSalePrice(1008, 70), popular: true },
            { id: "fb-seg-5000", count: 5000, label: "5.000 Seguidores Globales", costPrice: 5040, margin: 60, price: calcSalePrice(5040, 60) },
            { id: "fb-seg-latam-1000", count: 1000, label: "1.000 Seguidores Latinos", costPrice: 35664, margin: 40, price: calcSalePrice(35664, 40) }
          ]
        },
        {
          id: "fb-likes",
          name: "Likes en Publicaciones",
          description: "Me gusta para fotos, videos y estados en Facebook.",
          costPer1000: 1066,
          margin: 60,
          options: [
            { id: "fb-like-1000", count: 1000, label: "1.000 Likes Globales", costPrice: 1066, margin: 70, price: calcSalePrice(1066, 70), popular: true },
            { id: "fb-like-latam-1000", count: 1000, label: "1.000 Likes Latinos", costPrice: 29528, margin: 40, price: calcSalePrice(29528, 40) }
          ]
        },
        {
          id: "fb-vistas-reels",
          name: "Vistas de Video / Reels",
          description: "Multiplicá las reproducciones de tus reels y transmisiones.",
          costPer1000: 480,
          margin: 100,
          options: [
            { id: "fb-vis-1000", count: 1000, label: "1.000 Vistas de Reels", costPrice: 480, margin: 120, price: calcSalePrice(480, 120) },
            { id: "fb-vis-5000", count: 5000, label: "5.000 Vistas de Reels", costPrice: 2400, margin: 80, price: calcSalePrice(2400, 80), popular: true }
          ]
        },
        {
          id: "fb-miembros-grupo",
          name: "Miembros de Grupo",
          description: "Comunidades activas con miembros reales.",
          costPer1000: 3953,
          margin: 50,
          options: [
            { id: "fb-grup-1000", count: 1000, label: "1.000 Miembros para Grupo", costPrice: 3953, margin: 50, price: calcSalePrice(3953, 50), popular: true },
            { id: "fb-grup-arg-1000", count: 1000, label: "1.000 Miembros de Grupo Argentina 🇦🇷", costPrice: 42995, margin: 40, price: calcSalePrice(42995, 40) }
          ]
        }
      ]
    },
    youtube: {
      name: "YouTube",
      icon: "Youtube",
      color: "from-red-600 to-rose-700",
      services: [
        {
          id: "yt-suscriptores",
          name: "Suscriptores Premium",
          description: "Suscriptores de alta calidad para cumplir los requisitos del programa de socios.",
          costPer1000: 119105,
          margin: 40,
          options: [
            { id: "yt-sub-250", count: 250, label: "250 Suscriptores Premium", costPrice: 29776, margin: 45, price: calcSalePrice(29776, 45) },
            { id: "yt-sub-500", count: 500, label: "500 Suscriptores Premium", costPrice: 59552, margin: 40, price: calcSalePrice(59552, 40), popular: true },
            { id: "yt-sub-1000", count: 1000, label: "1.000 Suscriptores (Meta Monetización)", costPrice: 119105, margin: 38, price: calcSalePrice(119105, 38) }
          ]
        },
        {
          id: "yt-vistas",
          name: "Vistas de Videos",
          description: "Vistas orgánicas y retención de reproducción.",
          costPer1000: 3010,
          margin: 50,
          options: [
            { id: "yt-vis-1000", count: 1000, label: "1.000 Vistas Globales", costPrice: 3010, margin: 60, price: calcSalePrice(3010, 60) },
            { id: "yt-vis-5000", count: 5000, label: "5.000 Vistas Globales", costPrice: 15050, margin: 50, price: calcSalePrice(15050, 50), popular: true },
            { id: "yt-vis-latam-1000", count: 1000, label: "1.000 Vistas Latinas", costPrice: 18912, margin: 40, price: calcSalePrice(18912, 40) }
          ]
        },
        {
          id: "yt-likes",
          name: "Likes para Videos",
          description: "Engagement positivo que mejora el alcance en recomendaciones.",
          costPer1000: 3669,
          margin: 50,
          options: [
            { id: "yt-like-500", count: 500, label: "500 Likes en Video", costPrice: 1834, margin: 60, price: calcSalePrice(1834, 60) },
            { id: "yt-like-1000", count: 1000, label: "1.000 Likes en Video", costPrice: 3669, margin: 50, price: calcSalePrice(3669, 50), popular: true }
          ]
        }
      ]
    },
    tiktok: {
      name: "TikTok",
      icon: "Music2",
      color: "from-slate-800 to-zinc-950",
      services: [
        {
          id: "tt-seguidores",
          name: "Seguidores de Perfil",
          description: "Alcanzá los 1.000 seguidores para habilitar transmisiones en vivo y enlaces.",
          costPer1000: 9502,
          margin: 45,
          options: [
            { id: "tt-seg-500", count: 500, label: "500 Seguidores Globales", costPrice: 4751, margin: 50, price: calcSalePrice(4751, 50) },
            { id: "tt-seg-1000", count: 1000, label: "1.000 Seguidores (Habilitar LIVE)", costPrice: 9502, margin: 45, price: calcSalePrice(9502, 45), popular: true },
            { id: "tt-seg-hq-1000", count: 1000, label: "1.000 Seguidores Alta Calidad", costPrice: 18393, margin: 40, price: calcSalePrice(18393, 40) }
          ]
        },
        {
          id: "tt-likes",
          name: "Likes para Videos",
          description: "Impulso inicial para que el algoritmo viralice tus clips.",
          costPer1000: 3283,
          margin: 50,
          options: [
            { id: "tt-like-1000", count: 1000, label: "1.000 Likes", costPrice: 3283, margin: 55, price: calcSalePrice(3283, 55), popular: true },
            { id: "tt-like-2500", count: 2500, label: "2.500 Likes", costPrice: 8207, margin: 45, price: calcSalePrice(8207, 45) }
          ]
        },
        {
          id: "tt-vistas",
          name: "Vistas para Videos",
          description: "Aumentá las visualizaciones de tus tiktoks al instante.",
          costPer1000: 2464,
          margin: 60,
          options: [
            { id: "tt-vis-1000", count: 1000, label: "1.000 Vistas", costPrice: 2464, margin: 60, price: calcSalePrice(2464, 60) },
            { id: "tt-vis-5000", count: 5000, label: "5.000 Vistas", costPrice: 12320, margin: 45, price: calcSalePrice(12320, 45), popular: true }
          ]
        }
      ]
    },
    whatsapp: {
      name: "WhatsApp",
      icon: "MessageCircle",
      color: "from-emerald-600 to-green-700",
      services: [
        {
          id: "wa-canales",
          name: "Miembros para Canales de Difusión",
          description: "Potenciá tu canal de WhatsApp con miembros para que luzca multitudinario.",
          costPer1000: 32888,
          margin: 40,
          options: [
            { id: "wa-can-500", count: 500, label: "500 Miembros para Canal", costPrice: 16444, margin: 45, price: calcSalePrice(16444, 45) },
            { id: "wa-can-1000", count: 1000, label: "1.000 Miembros para Canal", costPrice: 32888, margin: 40, price: calcSalePrice(32888, 40), popular: true }
          ]
        },
        {
          id: "wa-reacciones",
          name: "Reacciones con Emojis en Publicaciones",
          description: "Reacciones (❤️, 🔥, 👍, 👏) automáticas en tus mensajes.",
          costPer1000: 6100,
          margin: 50,
          options: [
            { id: "wa-reac-500", count: 500, label: "500 Reacciones con Emojis", costPrice: 3050, margin: 60, price: calcSalePrice(3050, 60) },
            { id: "wa-reac-1000", count: 1000, label: "1.000 Reacciones con Emojis", costPrice: 6100, margin: 50, price: calcSalePrice(6100, 50), popular: true }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // 6. SECCIÓN "¿CÓMO COMPRAR EN 3 PASOS?"
  // ----------------------------------------------------------------------------
  steps: [
    {
      step: "01",
      title: "Elegí tus servicios",
      description: "Navegá por las 5 categorías, seleccioná tus variantes favoritas o armá tu combo y agregalos al carrito.",
      icon: "ShoppingCart"
    },
    {
      step: "02",
      title: "Enviá tu pedido a WhatsApp",
      description: "Hacé clic en 'Enviar Pedido por WhatsApp'. Se abrirá una conversación con el resumen detallado listo para enviar.",
      icon: "Send"
    },
    {
      step: "03",
      title: "Pagá por transferencia y activá",
      description: "Coordinamos el pago por transferencia o billetera virtual y te entregamos tus accesos con soporte garantizado en minutos.",
      icon: "CheckCircle2"
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. PREGUNTAS FRECUENTES (FAQ)
  // ----------------------------------------------------------------------------
  faqs: [
    {
      question: "¿Cómo y cuánto demora la activación?",
      answer: "La activación es prácticamente inmediata. Una vez enviado tu pedido por WhatsApp y acreditada la transferencia bancaria o billetera virtual, te enviamos los datos de acceso, credenciales o la activación en un plazo promedio de 5 a 20 minutos con una guía paso a paso clara."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos transferencias bancarias directas (CBU/CVU), Mercado Pago, Ualá, Lemon Cash, Prex y la mayoría de las billeteras virtuales de Argentina. El pago se coordina directamente por WhatsApp al +54 9 263 437-7019 de forma transparente y sin comisiones extras."
    },
    {
      question: "¿Tienen garantía y soporte durante todo el mes?",
      answer: "Sí, el 100% de nuestros servicios cuenta con garantía de reposición y soporte técnico activo durante toda la vigencia contratada (30 días en planes mensuales). Si surge cualquier duda o eventualidad, nos escribís a WhatsApp y te lo resolvemos en el acto."
    },
    {
      question: "¿Para los servicios de redes sociales (SMM) necesito dar mi contraseña?",
      answer: "¡Definitivamente NO! Jamás te pediremos contraseñas, pines ni accesos privados a tus cuentas. Para cualquier servicio de redes sociales únicamente requerimos el enlace público de tu publicación o tu nombre de usuario (@usuario). Tu privacidad y seguridad son absolutas."
    },
    {
      question: "¿Puedo pedir un combo especial con plataformas que no veo juntas?",
      answer: "¡Por supuesto! Podés utilizar nuestro constructor de combos o directamente escribirnos por WhatsApp con las plataformas que te interesen y te preparamos una cotización promocional exclusiva a medida."
    }
  ]
};

// Disponibilidad en el objeto global window para ejecución directa en navegador
if (typeof window !== "undefined") {
  window.CATALOG_CONFIG = CATALOG_CONFIG;
}

// Exportación compatible con Node.js y bundlers
if (typeof module !== "undefined" && module.exports) {
  module.exports = CATALOG_CONFIG;
}
