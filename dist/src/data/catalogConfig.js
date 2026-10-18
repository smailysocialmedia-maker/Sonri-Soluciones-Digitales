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

  // ----------------------------------------------------------------------------
  // CONEXIÓN EN LA NUBE (SUPABASE) PARA SINCRONIZACIÓN EN TIEMPO REAL
  // ----------------------------------------------------------------------------
  supabaseUrl: "https://yeuswjpjlujvtcjauddz.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXN3anBqbHVqdnRjamF1ZGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNTEzNzcsImV4cCI6MjEwNzgyNzM3N30.rgjO8-tFFZSv9f1oCsd65NKzrDD30FNAyX9qP48zLak",

  // Clave PIN para ingresar al Panel de Administrador (Oculto)
  adminPin: "1234",

  // Margen de ganancia general por defecto (en porcentaje)
  defaultProfitMargin: 40,

  // true = muestra precios en la web; false = modo cotización por privado
  showPrices: true,
  currencySymbol: "$",
  paymentMethodText: "Transferencia bancaria (Alias: sonridigital)",
  paymentAlias: "sonridigital",
  paymentAccountHolder: "Jonathan Emanuel Perez",

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
    },
    {
      id: "emprendimiento",
      name: "Emprendé con tu Panel",
      shortName: "Emprendé / Tu Negocio",
      icon: "Briefcase",
      badge: "Ganancias 100% Tuyas",
      description: "Obtené tu propio panel mayorista para revender servicios y software profesional para gestionar tus clientes."
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
    // PILAR 4: TELEVISIÓN DIGITAL & IPTV (12 plataformas completas)
    // --------------------------------------------------------------------------
    {
      id: "tv-digital-premium-futbol",
      name: "TV Digital Premium + Pack Fútbol",
      category: "iptv",
      badge: "Fútbol en Vivo HD",
      highlight: true,
      costPrice: 5920,
      margin: 40,
      price: calcSalePrice(5920, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-blue-600 via-indigo-700 to-cyan-500",
      description: "Ideal para ver todo el fútbol argentino e internacional en vivo con máxima fluidez. Incluye señales de cable premium, cine y series.",
      benefits: [
        "⏱ Entrega rápida: 15 min a 1 hs (horario 7:30 a 00:30 hs)",
        "Pack Fútbol completo (ESPN Premium y TNT Sports en HD/FHD)",
        "3 pantallas en simultáneo para disfrutar en familia",
        "Compatible con Smart TV, TV Box, Fire Stick, PC y Celular"
      ]
    },
    {
      id: "vision-digital-tv",
      name: "Vision Digital TV",
      category: "iptv",
      badge: "4 Pantallas · Ultra HD",
      costPrice: 5600,
      margin: 40,
      price: calcSalePrice(5600, 40),
      period: "30 días · 4 pantallas",
      icon: "MonitorPlay",
      gradient: "from-cyan-600 to-blue-800",
      description: "Plataforma de alta definición diseñada para hasta 4 dispositivos en simultáneo, ideal para hogares numerosos.",
      benefits: [
        "⏱ Entrega estimada: 30 min a 6 hs máx",
        "Hasta 4 dispositivos en simultáneo sin cortes",
        "Gran variedad de canales de deportes, noticias y películas",
        "Calidad Ultra HD / Full HD optimizada"
      ]
    },
    {
      id: "tv-digital-lumix",
      name: "TV Digital Lumix",
      category: "iptv",
      badge: "4 Pantallas · Estabilidad",
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días · 4 pantallas",
      icon: "Zap",
      gradient: "from-emerald-600 to-teal-800",
      description: "Servidores robustos de altísima estabilidad para transmisiones deportivas en vivo y eventos especiales sin interrupciones.",
      benefits: [
        "⏱ Entrega estimada: 20 min a 12 hs",
        "4 pantallas simultáneas para toda la familia",
        "Excelente estabilidad en partidos clave y fines de semana",
        "App intuitiva para Android TV, Fire TV y dispositivos móviles"
      ]
    },
    {
      id: "gs-play-hd",
      name: "GS Play HD",
      category: "iptv",
      badge: "Sin Interrupciones",
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días · 3 pantallas",
      icon: "PlaySquare",
      gradient: "from-violet-600 to-purple-800",
      description: "Disfrutá donde quieras y cuando quieras sin interrupciones con la mejor programación en vivo y a demanda.",
      benefits: [
        "⏱ Entrega estimada: 2 a 24 hs",
        "3 pantallas simultáneas en alta resolución",
        "Cientos de señales en vivo: deportes, infantiles y cine",
        "Conexión simple y rápida con soporte dedicado"
      ]
    },
    {
      id: "tv-digital-roku",
      name: "TV Digital Especial ROKU",
      category: "iptv",
      badge: "Especial Roku",
      costPrice: 5120,
      margin: 40,
      price: calcSalePrice(5120, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-purple-600 to-pink-800",
      description: "Servicio especialmente optimizado y configurado para televisores y dispositivos con sistema Roku.",
      benefits: [
        "⏱ Entrega estimada: 1 a 24 hs",
        "100% compatible con sistema Roku y Smart TVs compatibles",
        "3 pantallas en simultáneo con transmisión fluida",
        "Guía de configuración paso a paso garantizada"
      ]
    },
    {
      id: "tv-digital-argentv",
      name: "TV Digital ArgenTV",
      category: "iptv",
      badge: "Estándar / Full",
      hasPlanSelector: true,
      planOptions: ["Estándar", "Full"],
      planPricing: {
        "Estándar": { cost: 4800, margin: 40, price: calcSalePrice(4800, 40) },
        "Full": { cost: 7520, margin: 40, price: calcSalePrice(7520, 40) }
      },
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-sky-500 to-indigo-700",
      description: "Elegí el plan que mejor se adapte a vos: Estándar económico o Full con catálogo expandido y máxima potencia.",
      benefits: [
        "⏱ Entrega estimada: 1 a 12 hs",
        "Selector de plan: Estándar ($6.700) o Full ($10.550)",
        "3 pantallas simultáneas en cualquier dispositivo",
        "Canales en vivo de Argentina y el mundo con programación 24/7"
      ]
    },
    {
      id: "tv-digital-argentum",
      name: "TV Digital Argentum",
      category: "iptv",
      badge: "Máxima Calidad",
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días · 3 pantallas",
      icon: "Sparkles",
      gradient: "from-amber-600 to-orange-800",
      description: "Servidor de primera categoría con baja latencia, gran fidelidad de imagen y catálogo VOD prémium actualizado.",
      benefits: [
        "⏱ Entrega estimada: 2 a 6 hs",
        "3 pantallas en simultáneo con ancho de banda optimizado",
        "Pack Fútbol y deportes sin desfasaje de transmisión",
        "Miles de películas y temporadas completas de series"
      ]
    },
    {
      id: "iptv-flujo-tv",
      name: "IPTV Flujo TV",
      category: "iptv",
      badge: "Servidor Potente",
      costPrice: 9120,
      margin: 40,
      price: calcSalePrice(9120, 40),
      period: "30 días · 3 pantallas",
      icon: "Flame",
      gradient: "from-rose-600 to-red-800",
      description: "Servidor de altísimo desempeño diseñado para exigentes: fluidez inquebrantable en superclásicos y partidos decisivos.",
      benefits: [
        "⏱ Entrega estimada: 1 a 12 hs",
        "3 pantallas simultáneas con servidores de alto poder",
        "Cero buffering en transmisiones en vivo de alta demanda",
        "Canales argentinos, latinoamericanos y globales en Full HD"
      ]
    },
    {
      id: "pack-tv-digital-internet-4p",
      name: "Pack TV Digital por Internet (4 Pantallas)",
      category: "iptv",
      badge: "4 Pantallas · Multi-Servidor",
      hasPlanSelector: true,
      planOptions: ["Básico", "Plus", "Premium"],
      planPricing: {
        "Básico": { cost: 4000, margin: 40, price: calcSalePrice(4000, 40) },
        "Plus": { cost: 5120, margin: 40, price: calcSalePrice(5120, 40) },
        "Premium": { cost: 5600, margin: 40, price: calcSalePrice(5600, 40) }
      },
      costPrice: 4000,
      margin: 40,
      price: calcSalePrice(4000, 40),
      period: "30 días · 4 pantallas",
      icon: "Layers",
      gradient: "from-cyan-600 to-teal-700",
      description: "La alternativa más completa para 4 pantallas familiares. Elegí entre variante Básico, Plus o Premium según tus necesidades.",
      benefits: [
        "⏱ Entrega rápida: 30 min a 2 hs",
        "Variantes de servidor: Básico ($5.600), Plus ($7.150) o Premium ($7.850)",
        "4 pantallas activas en simultáneo para toda la casa",
        "Excelente variedad de señales en vivo, series y películas"
      ]
    },
    {
      id: "directv-go",
      name: "DirecTV GO (DGO)",
      category: "iptv",
      badge: "Deportes DSPORTS",
      costPrice: 14400,
      margin: 38,
      price: calcSalePrice(14400, 38),
      period: "30 días · 1 pantalla",
      icon: "Radio",
      gradient: "from-sky-600 to-blue-900",
      description: "La experiencia oficial de DGO: canales en vivo, señales exclusivas de DSPORTS y retroceso de programación en Full HD.",
      benefits: [
        "⏱ Entrega estimada: 1 a 24 hs",
        "Señales exclusivas de DSPORTS con coberturas únicas",
        "Guía electrónica interactiva y retroceso de programación",
        "Calidad Full HD nítida sin caídas en servidores oficiales"
      ]
    },
    {
      id: "mio-tv",
      name: "Mio TV / La Tele que va con vos",
      category: "iptv",
      badge: "Señales Digitales",
      costPrice: 12800,
      margin: 38,
      price: calcSalePrice(12800, 38),
      period: "30 días · 1 pantalla",
      icon: "MonitorPlay",
      gradient: "from-indigo-600 to-purple-800",
      description: "Excelente alternativa con programación variada, canales de aire, cable y deportes para Smart TV y Android.",
      benefits: [
        "⏱ Entrega estimada: 1 a 24 hs",
        "Interfaz ligera y rápida ideal para Smart TVs",
        "Canales nacionales e internacionales en vivo",
        "Alta estabilidad de transmisión y soporte guiado"
      ]
    },
    {
      id: "plex-tv-multimedia",
      name: "Plex TV Multimedia Server",
      category: "iptv",
      badge: "Cine & Series HD",
      costPrice: 2400,
      margin: 50,
      price: calcSalePrice(2400, 50),
      period: "30 días · 1 pantalla",
      icon: "HardDrive",
      gradient: "from-amber-600 to-yellow-700",
      description: "Servidor privado con miles de películas de estreno y series completas en la más alta calidad audiovisual a demanda.",
      benefits: [
        "⏱ Entrega estimada: 15 min a 2 hs",
        "Catálogo masivo sin límite de horas de visualización",
        "Calidad original 4K y 1080p con subtítulos y doblajes",
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
        "Servicios segmentados para Instagram, Facebook, YouTube y WhatsApp",
        "Elegí tu audiencia: Argentinos 🇦🇷, Latinos 🌎, Femeninos 👩 o Globales 🌐"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 6: EMPRENDIMIENTO, PANELES REVENDEDOR & SOFTWARE PRO
    // --------------------------------------------------------------------------
    {
      id: "membresia-inicial-agencia-redes",
      name: "Membresía Inicial — Panel Mayorista Propio",
      category: "emprendimiento",
      badge: "Acceso Mayorista",
      costPrice: 25000,
      margin: 20,
      price: 29900,
      period: "Acceso Permanente",
      icon: "Briefcase",
      gradient: "from-blue-600 via-indigo-600 to-cyan-500",
      description: "Acceso directo a tu propio panel de proveedor mayorista para revender streaming, TV digital, cuentas IA, internet y redes sociales con tus propios precios y ganancias.",
      benefits: [
        "🔑 Panel mayorista propio sin intermediarios",
        "💰 Comprá a costo neto y fijá tus propios precios de venta",
        "⚡ Ganancias 100% tuyas directo a tu cuenta",
        "📱 Plataforma web accesible desde celular, tablet o PC",
        "🛡️ Activación personalizada y segura vía WhatsApp"
      ]
    },
    {
      id: "membresia-acelerador-agencia-redes",
      name: "Membresía Acelerador — Panel + Formación + Grupo VIP",
      category: "emprendimiento",
      badge: "Recomendado · Más Completo",
      highlight: true,
      costPrice: 45000,
      margin: 18,
      price: 52900,
      period: "Acceso Completo + Comunidad",
      icon: "Flame",
      gradient: "from-amber-500 via-orange-600 to-red-600",
      description: "La solución completa para arrancar a facturar rápido con acompañamiento. Incluye el panel mayorista, curso intensivo paso a paso y comunidad activa.",
      benefits: [
        "🌟 Todo lo incluido en la Membresía Inicial (Panel Mayorista propio)",
        "🎓 Curso intensivo paso a paso: cómo vender y conseguir clientes",
        "👥 Acceso exclusivo al Grupo Privado de WhatsApp de la comunidad",
        "🚀 Estrategias de venta comprobadas y acompañamiento continuo",
        "⚡ Activación rápida y soporte para arrancar sin trabas"
      ]
    },
    {
      id: "clarita-la-cuenta-software",
      name: "Clarita la Cuenta — Software de Gestión y Control",
      category: "emprendimiento",
      badge: "App Exclusiva",
      hasPlanSelector: true,
      planOptions: ["Anual (1 Año)", "Vitalicia (De por Vida)"],
      planPricing: {
        "Anual (1 Año)": { cost: 35000, margin: 57, price: 54900 },
        "Vitalicia (De por Vida)": { cost: 55000, margin: 54, price: 84900 }
      },
      costPrice: 35000,
      margin: 57,
      price: 54900,
      period: "Licencia de Software",
      icon: "Sliders",
      gradient: "from-purple-600 via-indigo-600 to-cyan-500",
      demoUrl: "https://clarita-la-cuenta.netlify.app/",
      description: "El software definitivo para revendedores de cuentas. Llevá el control de tus clientes, llaves de acceso, servicios contratados y fechas de cobro sin planillas complejas.",
      benefits: [
        "📋 Base de datos ordenada de todos tus clientes y servicios",
        "⏰ Control de fechas de vencimiento y alertas de cobro",
        "💬 Registro de consultas y soporte por cliente",
        "☁️ 100% web, liviana, rápida y segura en cualquier dispositivo",
        "👁️ Incluye acceso a Demo en vivo para probar antes de comprar"
      ]
    },
    {
      id: "pack-emprendedor-total",
      name: "Pack Emprendedor Total (Acelerador + Clarita la Cuenta)",
      category: "emprendimiento",
      badge: "Mega Combo · Ahorro $17.900",
      highlight: true,
      costPrice: 70000,
      margin: 28,
      price: 89900,
      period: "Panel + Formación + Software",
      icon: "Sparkles",
      gradient: "from-cyan-500 via-purple-600 to-pink-500",
      description: "El paquete llave en mano definitivo para lanzar tu negocio digital: Panel mayorista + Curso + Grupo de WhatsApp + Software Clarita la Cuenta (Licencia Anual).",
      benefits: [
        "🚀 Membresía Acelerador completa (Panel + Curso + Grupo VIP)",
        "💻 Clarita la Cuenta Software (Licencia Anual incluida)",
        "💰 Ahorro de $17.900 comprando el combo conjunto",
        "⚡ Todo lo necesario para vender, cobrar y gestionar desde el día 1",
        "🛡️ Asesoramiento y activación guiada por WhatsApp"
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
      audienceFilters: [
        { id: "all", label: "🌟 Todos" },
        { id: "argentinos", label: "🇦🇷 Argentinos" },
        { id: "latam", label: "🌎 América Latina" },
        { id: "femeninos", label: "👩 Femenino" },
        { id: "global", label: "🌐 Global" }
      ],
      services: [
        {
          id: "ig-seg-arg",
          name: "Seguidores Argentinos 🇦🇷",
          audience: "argentinos",
          badge: "🇦🇷 Argentinos",
          description: "Perfiles 100% de Argentina reales y activos para potenciar tu presencia y algoritmo local.",
          costPer1000: 9500,
          margin: 45,
          options: [
            { id: "ig-sarg-500", count: 500, label: "500 Seguidores Argentinos 🇦🇷", costPrice: 4750, margin: 45, price: calcSalePrice(4750, 45) },
            { id: "ig-sarg-1000", count: 1000, label: "1.000 Seguidores Argentinos 🇦🇷", costPrice: 9500, margin: 45, price: calcSalePrice(9500, 45), popular: true },
            { id: "ig-sarg-2500", count: 2500, label: "2.500 Seguidores Argentinos 🇦🇷", costPrice: 23750, margin: 45, price: calcSalePrice(23750, 45) },
            { id: "ig-sarg-5000", count: 5000, label: "5.000 Seguidores Argentinos 🇦🇷", costPrice: 47500, margin: 45, price: calcSalePrice(47500, 45) }
          ]
        },
        {
          id: "ig-seg-latam",
          name: "Seguidores América Latina 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Crecimiento con público de habla hispana en toda Latinoamérica.",
          costPer1000: 4200,
          margin: 50,
          options: [
            { id: "ig-slat-500", count: 500, label: "500 Seguidores Latinos", costPrice: 2100, margin: 50, price: calcSalePrice(2100, 50) },
            { id: "ig-slat-1000", count: 1000, label: "1.000 Seguidores Latinos", costPrice: 4200, margin: 50, price: calcSalePrice(4200, 50), popular: true },
            { id: "ig-slat-2500", count: 2500, label: "2.500 Seguidores Latinos", costPrice: 10500, margin: 50, price: calcSalePrice(10500, 50) },
            { id: "ig-slat-5000", count: 5000, label: "5.000 Seguidores Latinos", costPrice: 21000, margin: 50, price: calcSalePrice(21000, 50) }
          ]
        },
        {
          id: "ig-seg-fem",
          name: "Seguidores Femeninos 👩",
          audience: "femeninos",
          badge: "👩 Audiencia Femenina",
          description: "Perfiles de mujeres reales, ideal para estética, moda, belleza y creadoras de contenido.",
          costPer1000: 3800,
          margin: 50,
          options: [
            { id: "ig-sfem-500", count: 500, label: "500 Seguidores Femeninos", costPrice: 1900, margin: 50, price: calcSalePrice(1900, 50) },
            { id: "ig-sfem-1000", count: 1000, label: "1.000 Seguidores Femeninos", costPrice: 3800, margin: 50, price: calcSalePrice(3800, 50), popular: true },
            { id: "ig-sfem-2500", count: 2500, label: "2.500 Seguidores Femeninos", costPrice: 9500, margin: 50, price: calcSalePrice(9500, 50) },
            { id: "ig-sfem-5000", count: 5000, label: "5.000 Seguidores Femeninos", costPrice: 19000, margin: 50, price: calcSalePrice(19000, 50) }
          ]
        },
        {
          id: "ig-seg-global",
          name: "Seguidores Globales 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Crecimiento rápido en volumen para superar los 1k/10k y potenciar la prueba social.",
          costPer1000: 1600,
          margin: 60,
          options: [
            { id: "ig-sglob-1000", count: 1000, label: "1.000 Seguidores Globales", costPrice: 1600, margin: 60, price: calcSalePrice(1600, 60), popular: true },
            { id: "ig-sglob-2500", count: 2500, label: "2.500 Seguidores Globales", costPrice: 4000, margin: 60, price: calcSalePrice(4000, 60) },
            { id: "ig-sglob-5000", count: 5000, label: "5.000 Seguidores Globales", costPrice: 8000, margin: 60, price: calcSalePrice(8000, 60) },
            { id: "ig-sglob-10000", count: 10000, label: "10.000 Seguidores Globales", costPrice: 16000, margin: 60, price: calcSalePrice(16000, 60) }
          ]
        },
        {
          id: "ig-like-arg",
          name: "Me Gusta / Likes Argentinos 🇦🇷",
          audience: "argentinos",
          badge: "🇦🇷 Argentinos",
          description: "Likes de usuarios de Argentina para posicionar tus publicaciones en el feed local.",
          costPer1000: 8256,
          margin: 40,
          options: [
            { id: "ig-larg-250", count: 250, label: "250 Likes Argentinos 🇦🇷", costPrice: 2064, margin: 40, price: calcSalePrice(2064, 40) },
            { id: "ig-larg-500", count: 500, label: "500 Likes Argentinos 🇦🇷", costPrice: 4128, margin: 40, price: calcSalePrice(4128, 40) },
            { id: "ig-larg-1000", count: 1000, label: "1.000 Likes Argentinos 🇦🇷", costPrice: 8256, margin: 40, price: calcSalePrice(8256, 40), popular: true }
          ]
        },
        {
          id: "ig-like-latam",
          name: "Me Gusta / Likes América Latina 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Me Gusta de cuentas hispanohablantes de diversos países de Latinoamérica.",
          costPer1000: 2383,
          margin: 50,
          options: [
            { id: "ig-llat-500", count: 500, label: "500 Likes Latinos", costPrice: 1192, margin: 50, price: calcSalePrice(1192, 50) },
            { id: "ig-llat-1000", count: 1000, label: "1.000 Likes Latinos", costPrice: 2383, margin: 50, price: calcSalePrice(2383, 50), popular: true },
            { id: "ig-llat-2500", count: 2500, label: "2.500 Likes Latinos", costPrice: 5958, margin: 50, price: calcSalePrice(5958, 50) }
          ]
        },
        {
          id: "ig-like-fem",
          name: "Me Gusta / Likes Femeninos 👩",
          audience: "femeninos",
          badge: "👩 Audiencia Femenina",
          description: "Me Gusta provenientes de perfiles de mujeres para estética, moda y estilo de vida.",
          costPer1000: 1970,
          margin: 50,
          options: [
            { id: "ig-lfem-500", count: 500, label: "500 Likes Femeninos", costPrice: 985, margin: 50, price: calcSalePrice(985, 50) },
            { id: "ig-lfem-1000", count: 1000, label: "1.000 Likes Femeninos", costPrice: 1970, margin: 50, price: calcSalePrice(1970, 50), popular: true },
            { id: "ig-lfem-2500", count: 2500, label: "2.500 Likes Femeninos", costPrice: 4925, margin: 50, price: calcSalePrice(4925, 50) }
          ]
        },
        {
          id: "ig-likes",
          name: "Me Gusta / Likes Globales 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Impulso instantáneo y económico para cualquier publicación, foto o carrusel.",
          costPer1000: 760,
          margin: 60,
          options: [
            { id: "ig-like-500", count: 500, label: "500 Likes Globales", costPrice: 380, margin: 80, price: calcSalePrice(380, 80) },
            { id: "ig-like-1000", count: 1000, label: "1.000 Likes Globales", costPrice: 760, margin: 60, price: calcSalePrice(760, 60), popular: true },
            { id: "ig-like-2500", count: 2500, label: "2.500 Likes Globales", costPrice: 1900, margin: 60, price: calcSalePrice(1900, 60) },
            { id: "ig-like-5000", count: 5000, label: "5.000 Likes Globales", costPrice: 3800, margin: 60, price: calcSalePrice(3800, 60) }
          ]
        },
        {
          id: "ig-vistas",
          name: "Vistas Reels / Vídeo / IGTV",
          audience: "global",
          badge: "⚡ Alta Velocidad",
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
          id: "ig-com-fem",
          name: "Comentarios Personalizados Femeninos 👩",
          audience: "femeninos",
          badge: "👩 Audiencia Femenina",
          description: "Comentarios 100% redactados por vos pero publicados desde perfiles femeninos creíbles.",
          costPer1000: 63141,
          margin: 45,
          minQty: 10,
          stepQty: 10,
          options: [
            { id: "ig-comf-10", count: 10, label: "10 Comentarios Femeninos", costPrice: 631, margin: 50, price: calcSalePrice(631, 50) },
            { id: "ig-comf-25", count: 25, label: "25 Comentarios Femeninos", costPrice: 1579, margin: 45, price: calcSalePrice(1579, 45), popular: true },
            { id: "ig-comf-50", count: 50, label: "50 Comentarios Femeninos", costPrice: 3157, margin: 45, price: calcSalePrice(3157, 45) }
          ]
        },
        {
          id: "ig-comentarios",
          name: "Comentarios Personalizados en Español 💬",
          audience: "latam",
          badge: "🌎 Habla Hispana",
          description: "Comentarios redactados por vos para generar interacción real, ventas y debate en tus posts.",
          costPer1000: 60480,
          margin: 45,
          minQty: 10,
          stepQty: 10,
          options: [
            { id: "ig-com-10", count: 10, label: "10 Comentarios Personalizados", costPrice: 605, margin: 60, price: calcSalePrice(605, 60) },
            { id: "ig-com-25", count: 25, label: "25 Comentarios Personalizados", costPrice: 1512, margin: 55, price: calcSalePrice(1512, 55), popular: true },
            { id: "ig-com-50", count: 50, label: "50 Comentarios Personalizados", costPrice: 3024, margin: 50, price: calcSalePrice(3024, 50) }
          ]
        },
        {
          id: "ig-vis-historias",
          name: "Vistas de Historias (Stories) 👁️",
          audience: "global",
          badge: "👁️ Stories",
          description: "Vistas e impresiones para todas tus historias activas para reflejar alto engagement.",
          costPer1000: 1153,
          margin: 60,
          options: [
            { id: "ig-sto-500", count: 500, label: "500 Vistas Stories", costPrice: 577, margin: 60, price: calcSalePrice(577, 60) },
            { id: "ig-sto-1000", count: 1000, label: "1.000 Vistas Stories", costPrice: 1153, margin: 60, price: calcSalePrice(1153, 60), popular: true },
            { id: "ig-sto-2500", count: 2500, label: "2.500 Vistas Stories", costPrice: 2883, margin: 60, price: calcSalePrice(2883, 60) }
          ]
        },
        {
          id: "ig-miembros-canal",
          name: "Miembros de Canal de Instagram 📢",
          audience: "global",
          badge: "📢 Canal Difusión",
          description: "Sumá miembros a tu canal de difusión para que luzca activo y masivo.",
          costPer1000: 8078,
          margin: 45,
          options: [
            { id: "ig-chan-500", count: 500, label: "500 Miembros de Canal", costPrice: 4039, margin: 50, price: calcSalePrice(4039, 50) },
            { id: "ig-chan-1000", count: 1000, label: "1.000 Miembros de Canal", costPrice: 8078, margin: 45, price: calcSalePrice(8078, 45), popular: true }
          ]
        },
        {
          id: "ig-vivos",
          name: "Espectadores para Transmisión en Vivo 🔴",
          audience: "global",
          badge: "🔴 En Vivo",
          description: "Mantené tu transmisión con audiencia activa para atraer más personas orgánicas.",
          costPer1000: 25402,
          margin: 45,
          options: [
            { id: "ig-vivo-15m-100", count: 100, label: "100 Espectadores (15 Minutos)", costPrice: 2540, margin: 50, price: calcSalePrice(2540, 50) },
            { id: "ig-vivo-60m-100", count: 100, label: "100 Espectadores (60 Minutos)", costPrice: 8090, margin: 45, price: calcSalePrice(8090, 45), popular: true },
            { id: "ig-vivo-120m-100", count: 100, label: "100 Espectadores (120 Minutos)", costPrice: 11970, margin: 40, price: calcSalePrice(11970, 40) }
          ]
        }
      ]
    },
    facebook: {
      name: "Facebook",
      icon: "Facebook",
      color: "from-blue-600 to-indigo-800",
      audienceFilters: [
        { id: "all", label: "🌟 Todos" },
        { id: "argentinos", label: "🇦🇷 Argentinos" },
        { id: "latam", label: "🌎 América Latina" },
        { id: "femeninos", label: "👩 Femenino" },
        { id: "global", label: "🌐 Global" }
      ],
      services: [
        {
          id: "fb-seg-latam",
          name: "Seguidores Latinos de Página / Perfil 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Seguidores reales de habla hispana para fanpages comerciales o creadores de contenido.",
          costPer1000: 35664,
          margin: 40,
          options: [
            { id: "fb-slat-250", count: 250, label: "250 Seguidores Latinos", costPrice: 8916, margin: 40, price: calcSalePrice(8916, 40) },
            { id: "fb-slat-500", count: 500, label: "500 Seguidores Latinos", costPrice: 17832, margin: 40, price: calcSalePrice(17832, 40) },
            { id: "fb-slat-1000", count: 1000, label: "1.000 Seguidores Latinos", costPrice: 35664, margin: 40, price: calcSalePrice(35664, 40), popular: true }
          ]
        },
        {
          id: "fb-seguidores",
          name: "Seguidores Globales de Fanpage / Perfil 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Crecimiento rápido en volumen para fanpages y perfiles públicos de negocio.",
          costPer1000: 1008,
          margin: 65,
          options: [
            { id: "fb-seg-500", count: 500, label: "500 Seguidores Globales", costPrice: 504, margin: 70, price: calcSalePrice(504, 70) },
            { id: "fb-seg-1000", count: 1000, label: "1.000 Seguidores Globales", costPrice: 1008, margin: 70, price: calcSalePrice(1008, 70), popular: true },
            { id: "fb-seg-2500", count: 2500, label: "2.500 Seguidores Globales", costPrice: 2520, margin: 65, price: calcSalePrice(2520, 65) },
            { id: "fb-seg-5000", count: 5000, label: "5.000 Seguidores Globales", costPrice: 5040, margin: 60, price: calcSalePrice(5040, 60) }
          ]
        },
        {
          id: "fb-like-latam",
          name: "Likes Latinos en Publicaciones 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Me Gusta de usuarios latinoamericanos en fotos, publicaciones y enlaces.",
          costPer1000: 29528,
          margin: 40,
          options: [
            { id: "fb-llat-250", count: 250, label: "250 Likes Latinos", costPrice: 7382, margin: 40, price: calcSalePrice(7382, 40) },
            { id: "fb-llat-500", count: 500, label: "500 Likes Latinos", costPrice: 14764, margin: 40, price: calcSalePrice(14764, 40) },
            { id: "fb-llat-1000", count: 1000, label: "1.000 Likes Latinos", costPrice: 29528, margin: 40, price: calcSalePrice(29528, 40), popular: true }
          ]
        },
        {
          id: "fb-likes",
          name: "Likes Globales en Publicaciones 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Me Gusta instantáneos para fotos, videos y estados en Facebook.",
          costPer1000: 1066,
          margin: 65,
          options: [
            { id: "fb-like-500", count: 500, label: "500 Likes Globales", costPrice: 533, margin: 70, price: calcSalePrice(533, 70) },
            { id: "fb-like-1000", count: 1000, label: "1.000 Likes Globales", costPrice: 1066, margin: 70, price: calcSalePrice(1066, 70), popular: true },
            { id: "fb-like-2500", count: 2500, label: "2.500 Likes Globales", costPrice: 2665, margin: 65, price: calcSalePrice(2665, 65) }
          ]
        },
        {
          id: "fb-reacciones",
          name: "Reacciones con Emojis (❤️, 😮, 😂, 🥰) 🔥",
          audience: "global",
          badge: "🔥 Reacciones",
          description: "Reacciones auténticas: Me Encanta ❤️, Me Asombra 😮, Me Divierte 😂 o Me Importa 🥰.",
          costPer1000: 517,
          margin: 70,
          options: [
            { id: "fb-reac-500", count: 500, label: "500 Reacciones con Emojis", costPrice: 259, margin: 70, price: calcSalePrice(259, 70) },
            { id: "fb-reac-1000", count: 1000, label: "1.000 Reacciones con Emojis", costPrice: 517, margin: 70, price: calcSalePrice(517, 70), popular: true },
            { id: "fb-reac-2500", count: 2500, label: "2.500 Reacciones con Emojis", costPrice: 1293, margin: 70, price: calcSalePrice(1293, 70) }
          ]
        },
        {
          id: "fb-vistas-reels",
          name: "Vistas de Video / Facebook Reels ⚡",
          audience: "global",
          badge: "⚡ Reels / Video",
          description: "Multiplicá las reproducciones para posicionar tus videos y Reels en Facebook Watch.",
          costPer1000: 480,
          margin: 80,
          options: [
            { id: "fb-vis-1000", count: 1000, label: "1.000 Vistas de Reels", costPrice: 480, margin: 120, price: calcSalePrice(480, 120) },
            { id: "fb-vis-5000", count: 5000, label: "5.000 Vistas de Reels", costPrice: 2400, margin: 80, price: calcSalePrice(2400, 80), popular: true },
            { id: "fb-vis-10000", count: 10000, label: "10.000 Vistas de Reels", costPrice: 4800, margin: 80, price: calcSalePrice(4800, 80) }
          ]
        },
        {
          id: "fb-miembros-grupo-arg",
          name: "Miembros de Grupo Argentina 🇦🇷",
          audience: "argentinos",
          badge: "🇦🇷 Argentinos",
          description: "Miembros 100% de Argentina para grupos de compra/venta, comunidades y empresas.",
          costPer1000: 42995,
          margin: 40,
          options: [
            { id: "fb-grup-arg-250", count: 250, label: "250 Miembros Argentina 🇦🇷", costPrice: 10749, margin: 40, price: calcSalePrice(10749, 40) },
            { id: "fb-grup-arg-500", count: 500, label: "500 Miembros Argentina 🇦🇷", costPrice: 21498, margin: 40, price: calcSalePrice(21498, 40) },
            { id: "fb-grup-arg-1000", count: 1000, label: "1.000 Miembros Argentina 🇦🇷", costPrice: 42995, margin: 40, price: calcSalePrice(42995, 40), popular: true }
          ]
        },
        {
          id: "fb-miembros-grupo",
          name: "Miembros de Grupo Globales 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Sumá miembros a tu grupo de Facebook para que luzca activo y confiable.",
          costPer1000: 3953,
          margin: 50,
          options: [
            { id: "fb-grup-500", count: 500, label: "500 Miembros de Grupo", costPrice: 1977, margin: 50, price: calcSalePrice(1977, 50) },
            { id: "fb-grup-1000", count: 1000, label: "1.000 Miembros de Grupo", costPrice: 3953, margin: 50, price: calcSalePrice(3953, 50), popular: true },
            { id: "fb-grup-2500", count: 2500, label: "2.500 Miembros de Grupo", costPrice: 9883, margin: 50, price: calcSalePrice(9883, 50) }
          ]
        },
        {
          id: "fb-res-fem",
          name: "Recomendaciones SI + Reseña Femenina 👩",
          audience: "femeninos",
          badge: "👩 Audiencia Femenina",
          description: "Reseñas positivas en tu página de Facebook redactadas por vos desde perfiles de mujeres.",
          costPer1000: 232502,
          margin: 40,
          minQty: 5,
          stepQty: 5,
          options: [
            { id: "fb-rfem-5", count: 5, label: "5 Reseñas Femeninas", costPrice: 1163, margin: 45, price: calcSalePrice(1163, 45) },
            { id: "fb-rfem-10", count: 10, label: "10 Reseñas Femeninas", costPrice: 2325, margin: 40, price: calcSalePrice(2325, 40), popular: true },
            { id: "fb-rfem-25", count: 25, label: "25 Reseñas Femeninas", costPrice: 5813, margin: 40, price: calcSalePrice(5813, 40) }
          ]
        },
        {
          id: "fb-res-latam",
          name: "Recomendaciones SI + Reseña LATAM 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Opiniones y calificaciones de 5 estrellas en español para generar máxima confianza comercial.",
          costPer1000: 103680,
          margin: 45,
          minQty: 10,
          stepQty: 10,
          options: [
            { id: "fb-rlat-10", count: 10, label: "10 Reseñas Latinas", costPrice: 1037, margin: 45, price: calcSalePrice(1037, 45) },
            { id: "fb-rlat-25", count: 25, label: "25 Reseñas Latinas", costPrice: 2592, margin: 45, price: calcSalePrice(2592, 45), popular: true },
            { id: "fb-rlat-50", count: 50, label: "50 Reseñas Latinas", costPrice: 5184, margin: 45, price: calcSalePrice(5184, 45) }
          ]
        },
        {
          id: "fb-vivo",
          name: "Espectadores de Transmisión en Vivo 🔴",
          audience: "global",
          badge: "🔴 En Vivo",
          description: "Espectadores en tiempo real para transmisiones de ventas, lanzamientos o gaming.",
          costPer1000: 5240,
          margin: 50,
          options: [
            { id: "fb-vivo-15m-100", count: 100, label: "100 Espectadores (15 Minutos)", costPrice: 524, margin: 55, price: calcSalePrice(524, 55) },
            { id: "fb-vivo-60m-100", count: 100, label: "100 Espectadores (60 Minutos)", costPrice: 2096, margin: 50, price: calcSalePrice(2096, 50), popular: true },
            { id: "fb-vivo-120m-100", count: 100, label: "100 Espectadores (120 Minutos)", costPrice: 4191, margin: 50, price: calcSalePrice(4191, 50) }
          ]
        }
      ]
    },
    youtube: {
      name: "YouTube",
      icon: "Youtube",
      color: "from-red-600 to-rose-700",
      audienceFilters: [
        { id: "all", label: "🌟 Todos" },
        { id: "monetizacion", label: "🎯 Monetización" },
        { id: "latam", label: "🌎 América Latina" },
        { id: "global", label: "🌐 Global" }
      ],
      services: [
        {
          id: "yt-suscriptores",
          name: "Suscriptores Premium (Meta Monetización) 🎯",
          audience: "monetizacion",
          badge: "🎯 Meta Monetización",
          description: "Suscriptores de alta calidad y estabilidad para cumplir el requisito de 1.000 subs de YouTube Partner.",
          costPer1000: 119105,
          margin: 38,
          options: [
            { id: "yt-sub-100", count: 100, label: "100 Suscriptores Premium", costPrice: 11911, margin: 40, price: calcSalePrice(11911, 40) },
            { id: "yt-sub-250", count: 250, label: "250 Suscriptores Premium", costPrice: 29776, margin: 40, price: calcSalePrice(29776, 40) },
            { id: "yt-sub-500", count: 500, label: "500 Suscriptores Premium", costPrice: 59553, margin: 38, price: calcSalePrice(59553, 38) },
            { id: "yt-sub-1000", count: 1000, label: "1.000 Suscriptores (Monetización)", costPrice: 119105, margin: 38, price: calcSalePrice(119105, 38), popular: true }
          ]
        },
        {
          id: "yt-vis-latam",
          name: "Vistas Latinas con Alta Retención 🌎",
          audience: "latam",
          badge: "🌎 América Latina",
          description: "Reproducciones hispanohablantes con retención orgánica para posicionar en el buscador de YouTube.",
          costPer1000: 18912,
          margin: 40,
          options: [
            { id: "yt-vlat-500", count: 500, label: "500 Vistas Latinas", costPrice: 9456, margin: 40, price: calcSalePrice(9456, 40) },
            { id: "yt-vlat-1000", count: 1000, label: "1.000 Vistas Latinas", costPrice: 18912, margin: 40, price: calcSalePrice(18912, 40), popular: true },
            { id: "yt-vlat-2500", count: 2500, label: "2.500 Vistas Latinas", costPrice: 47280, margin: 40, price: calcSalePrice(47280, 40) }
          ]
        },
        {
          id: "yt-vis-rapidas",
          name: "Vistas Rápidas para Videos y Shorts ⚡",
          audience: "global",
          badge: "⚡ Alta Calidad",
          description: "Reproducciones rápidas para impulsar videos recién subidos y YouTube Shorts.",
          costPer1000: 4692,
          margin: 50,
          options: [
            { id: "yt-vrap-1000", count: 1000, label: "1.000 Vistas Rápidas", costPrice: 4692, margin: 50, price: calcSalePrice(4692, 50) },
            { id: "yt-vrap-2500", count: 2500, label: "2.500 Vistas Rápidas", costPrice: 11730, margin: 50, price: calcSalePrice(11730, 50), popular: true },
            { id: "yt-vrap-5000", count: 5000, label: "5.000 Vistas Rápidas", costPrice: 23460, margin: 50, price: calcSalePrice(23460, 50) }
          ]
        },
        {
          id: "yt-vistas",
          name: "Vistas Globales para Videos 🌐",
          audience: "global",
          badge: "🌐 Global",
          description: "Volumen económico de vistas para aumentar el contador de reproducciones.",
          costPer1000: 3010,
          margin: 50,
          options: [
            { id: "yt-vis-1000", count: 1000, label: "1.000 Vistas Globales", costPrice: 3010, margin: 60, price: calcSalePrice(3010, 60) },
            { id: "yt-vis-5000", count: 5000, label: "5.000 Vistas Globales", costPrice: 15050, margin: 50, price: calcSalePrice(15050, 50), popular: true },
            { id: "yt-vis-10000", count: 10000, label: "10.000 Vistas Globales", costPrice: 30100, margin: 50, price: calcSalePrice(30100, 50) }
          ]
        },
        {
          id: "yt-horas-monetizar",
          name: "Horas de Reproducción Monetizar (+60 Min) ⏱️",
          audience: "monetizacion",
          badge: "⏱️ 4.000 Horas",
          description: "El requisito más difícil de YouTube: alcanzá las 4.000 horas de visualización para activar la monetización (requiere video de +60 min).",
          costPer1000: 829591,
          margin: 30,
          options: [
            { id: "yt-hm-100", count: 100, label: "100 Horas de Reproducción", costPrice: 82959, margin: 30, price: calcSalePrice(82959, 30) },
            { id: "yt-hm-250", count: 250, label: "250 Horas de Reproducción", costPrice: 207398, margin: 30, price: calcSalePrice(207398, 30) },
            { id: "yt-hm-500", count: 500, label: "500 Horas de Reproducción", costPrice: 414796, margin: 30, price: calcSalePrice(414796, 30), popular: true },
            { id: "yt-hm-1000", count: 1000, label: "1.000 Horas de Reproducción", costPrice: 829591, margin: 30, price: calcSalePrice(829591, 30) }
          ]
        },
        {
          id: "yt-likes",
          name: "Likes para Videos y Shorts 👍",
          audience: "global",
          badge: "👍 Likes",
          description: "Engagement positivo para que el algoritmo recomiende tu video a nuevos espectadores.",
          costPer1000: 3669,
          margin: 50,
          options: [
            { id: "yt-like-250", count: 250, label: "250 Likes en Video", costPrice: 917, margin: 55, price: calcSalePrice(917, 55) },
            { id: "yt-like-500", count: 500, label: "500 Likes en Video", costPrice: 1834, margin: 50, price: calcSalePrice(1834, 50) },
            { id: "yt-like-1000", count: 1000, label: "1.000 Likes en Video", costPrice: 3669, margin: 50, price: calcSalePrice(3669, 50), popular: true },
            { id: "yt-like-2500", count: 2500, label: "2.500 Likes en Video", costPrice: 9173, margin: 50, price: calcSalePrice(9173, 50) }
          ]
        },
        {
          id: "yt-comentarios",
          name: "Comentarios Personalizados Videos / Shorts 💬",
          audience: "latam",
          badge: "💬 Comentarios",
          description: "Comentarios 100% redactados por vos para generar interacción y debate positivo.",
          costPer1000: 69854,
          margin: 40,
          minQty: 10,
          stepQty: 10,
          options: [
            { id: "yt-com-10", count: 10, label: "10 Comentarios Personalizados", costPrice: 699, margin: 45, price: calcSalePrice(699, 45) },
            { id: "yt-com-25", count: 25, label: "25 Comentarios Personalizados", costPrice: 1746, margin: 40, price: calcSalePrice(1746, 40), popular: true },
            { id: "yt-com-50", count: 50, label: "50 Comentarios Personalizados", costPrice: 3493, margin: 40, price: calcSalePrice(3493, 40) }
          ]
        },
        {
          id: "yt-compartidos",
          name: "Compartidos de Video en Redes Sociales 🚀",
          audience: "global",
          badge: "🚀 Viralización",
          description: "Compartidos externos en plataformas sociales para disparar las métricas de tráfico.",
          costPer1000: 3810,
          margin: 50,
          options: [
            { id: "yt-comp-500", count: 500, label: "500 Compartidos", costPrice: 1905, margin: 50, price: calcSalePrice(1905, 50) },
            { id: "yt-comp-1000", count: 1000, label: "1.000 Compartidos", costPrice: 3810, margin: 50, price: calcSalePrice(3810, 50), popular: true },
            { id: "yt-comp-2500", count: 2500, label: "2.500 Compartidos", costPrice: 9525, margin: 50, price: calcSalePrice(9525, 50) }
          ]
        }
      ]
    },
    whatsapp: {
      name: "WhatsApp",
      icon: "MessageCircle",
      color: "from-emerald-600 to-green-700",
      audienceFilters: [
        { id: "all", label: "🌟 Todos" },
        { id: "canales", label: "📢 Canales" },
        { id: "reacciones", label: "🔥 Reacciones" }
      ],
      services: [
        {
          id: "wa-canales",
          name: "Miembros para Canales de Difusión 👥",
          audience: "canales",
          badge: "📢 Canales Oficiales",
          description: "Multiplicá la cantidad de miembros en tu canal de WhatsApp para inspirar credibilidad y confianza masiva.",
          costPer1000: 32888,
          margin: 40,
          options: [
            { id: "wa-can-250", count: 250, label: "250 Miembros para Canal", costPrice: 8222, margin: 40, price: calcSalePrice(8222, 40) },
            { id: "wa-can-500", count: 500, label: "500 Miembros para Canal", costPrice: 16444, margin: 40, price: calcSalePrice(16444, 40) },
            { id: "wa-can-1000", count: 1000, label: "1.000 Miembros para Canal", costPrice: 32888, margin: 40, price: calcSalePrice(32888, 40), popular: true }
          ]
        },
        {
          id: "wa-reacciones",
          name: "Reacciones con Emojis en Publicaciones de Canal 🔥",
          audience: "reacciones",
          badge: "🔥 Emojis Específicos",
          description: "Reacciones automáticas con emojis a elección (❤️ Corazón, 🔥 Fuego, 👍 Pulgar arriba, 👏 Aplauso) en tus mensajes del canal.",
          costPer1000: 6100,
          margin: 50,
          options: [
            { id: "wa-reac-250", count: 250, label: "250 Reacciones con Emojis", costPrice: 1525, margin: 55, price: calcSalePrice(1525, 55) },
            { id: "wa-reac-500", count: 500, label: "500 Reacciones con Emojis", costPrice: 3050, margin: 50, price: calcSalePrice(3050, 50) },
            { id: "wa-reac-1000", count: 1000, label: "1.000 Reacciones con Emojis", costPrice: 6100, margin: 50, price: calcSalePrice(6100, 50), popular: true }
          ]
        },
        {
          id: "wa-reacciones-mix",
          name: "Pack Reacciones Variadas Mix en Publicaciones ✨",
          audience: "reacciones",
          badge: "✨ Mix Emojis",
          description: "Distribución variada y natural de reacciones con múltiples emojis en tus mensajes del canal.",
          costPer1000: 13608,
          margin: 45,
          options: [
            { id: "wa-rmix-250", count: 250, label: "250 Reacciones Mix", costPrice: 3402, margin: 50, price: calcSalePrice(3402, 50) },
            { id: "wa-rmix-500", count: 500, label: "500 Reacciones Mix", costPrice: 6804, margin: 45, price: calcSalePrice(6804, 45) },
            { id: "wa-rmix-1000", count: 1000, label: "1.000 Reacciones Mix", costPrice: 13608, margin: 45, price: calcSalePrice(13608, 45), popular: true }
          ]
        }
      ]
    }
  },

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
      answer: "Trabajamos con entrega prioritaria. Si el servicio solicitado cuenta con stock inmediato disponible, la activación se realiza en pocos minutos. Aquellos servicios que son bajo pedido o requieren configuración personalizada y asignación de cupo privado se entregan de forma segura en el transcurso de la jornada (plazo habitual: de 1 a 24 hs según demanda), garantizándote total estabilidad y soporte activo."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos transferencias bancarias directas (CBU/CVU), Mercado Pago, Ualá, Lemon Cash y cualquier billetera virtual a nuestro Alias oficial: sonridigital. Una vez realizada la transferencia, nos enviás el comprobante por WhatsApp al +54 9 263 437-7019 y procesamos tu pedido al instante."
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
