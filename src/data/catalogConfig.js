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

// Helper para calcular precio de venta en Zona Gamer (costo + ganancia fija en pesos)
function calcGamerSalePrice(costNeto, markupARS = 7000) {
  if (!costNeto || isNaN(costNeto)) return 0;
  return Number(costNeto) + Number(markupARS);
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

  // Configuración especial Zona Gamer
  gamerFixedMarkupARS: 7000,
  showGamerIndividualPrices: true,

  // true = muestra precios en la web; false = modo cotización por privado
  showPrices: true,
  currencySymbol: "$",
  paymentMethodText: "Transferencia bancaria (Alias: sonridigital)",
  paymentAlias: "sonridigital",
  paymentAccountHolder: "Jonathan Emanuel Perez",

  // ----------------------------------------------------------------------------
  // 2. CATEGORÍAS PRINCIPALES (8 PILARES)
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
    },
    {
      id: "zona-gamer",
      name: "Zona Gamer & Consolas",
      shortName: "Zona Gamer",
      icon: "Gamepad2",
      badge: "PS4 • PS5 • PC",
      description: "Packs de juegos primarios, emuladores para PC, retro PS3, mods y catálogo de +230 títulos."
    },
    {
      id: "mega-packs",
      name: "Mega Packs & Cursos +14TB",
      shortName: "Mega Packs +14TB",
      icon: "FolderArchive",
      badge: "+14 Terabytes",
      description: "Bibliotecas masivas de cursos, recursos gráficos, programación, oficios y libros con acceso vitalicio."
    }
  ],

  // ----------------------------------------------------------------------------
  // 3. CONSTRUCTOR DE COMBOS DE STREAMING (Costo base más alto: .000 ARS)
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
  // 4. INVENTARIO UNIFICADO (PILARES DEL CATÁLOGO)
  // ----------------------------------------------------------------------------
  products: [
    // --------------------------------------------------------------------------
    // PILAR 1: STREAMING & CINE EN CASA (CON PROVEEDOR ECONÓMICO ACTUALIZADO)
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
      name: "Netflix Original 4K",
      category: "streaming",
      badge: "Más Pedido 🔥",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Compartido (1 Pantalla)",
        "Perfil Extra Personal (1 Pantalla sin bloqueo)"
      ],
      planPricing: {
        "Perfil Compartido (1 Pantalla)": { cost: 8500, margin: 42, price: 12000 },
        "Perfil Extra Personal (1 Pantalla sin bloqueo)": { cost: 10500, margin: 80, price: 18900 }
      },
      costPrice: 8500,
      margin: 42,
      price: 12000,
      period: "30 días",
      icon: "Film",
      gradient: "from-red-600 to-purple-800",
      description: "Acceso con perfil privado y PIN de seguridad en Ultra HD 4K + HDR. Cero caídas y sin cortes por geolocalización.",
      benefits: [
        "Perfil Compartido (1 Pantalla en cuenta de 5 usuarios · 30 días)",
        "Perfil Extra Personal (1 Pantalla sin bloqueo de hogar · 30 días)",
        "Calidad Ultra HD 4K + HDR con audio espacial",
        "Activación rápida y soporte 30 días garantizado"
      ]
    },
    {
      id: "disney-plus-premium",
      name: "Disney+ (ESPN Deportes)",
      category: "streaming",
      badge: "Deportes ESPN",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Personal (1 Pantalla HD)",
        "Perfil Premium 4K + ESPN (1 Pantalla)",
        "Cuenta Completa Familiar (4 Pantallas · 7 Perfiles)"
      ],
      planPricing: {
        "Perfil Personal (1 Pantalla HD)": { cost: 2500, margin: 176, price: 6900 },
        "Perfil Premium 4K + ESPN (1 Pantalla)": { cost: 6000, margin: 100, price: 12000 },
        "Cuenta Completa Familiar (4 Pantallas · 7 Perfiles)": { cost: 12000, margin: 91, price: 22900 }
      },
      costPrice: 2500,
      margin: 176,
      price: 6900,
      period: "30 días",
      icon: "Sparkles",
      gradient: "from-blue-600 to-indigo-900",
      description: "Catálogo completo de Disney, Pixar, Marvel, Star Wars y todos los eventos y partidos en vivo de ESPN.",
      benefits: [
        "Perfil Personal (1 Pantalla HD · 30 días)",
        "Perfil Premium 4K + ESPN (1 Pantalla Ultra HD · Sin anuncios · Deportes en vivo · 30 días)",
        "Cuenta Completa Familiar (4 Pantallas simultáneas · 7 Perfiles creados · 30 días)",
        "Compatible con Smart TV, celulares, tablets, TV Box y consolas"
      ]
    },
    {
      id: "max-hbo",
      name: "Max / HBO Max",
      category: "streaming",
      badge: "Cine Taquillero",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Personal (1 Pantalla Full HD)",
        "Perfil Platino 4K (1 Pantalla Ultra HD)",
        "Cuenta Completa Familiar (4 Pantallas simultáneas)"
      ],
      planPricing: {
        "Perfil Personal (1 Pantalla Full HD)": { cost: 2500, margin: 176, price: 6900 },
        "Perfil Platino 4K (1 Pantalla Ultra HD)": { cost: 4000, margin: 122, price: 8900 },
        "Cuenta Completa Familiar (4 Pantallas simultáneas)": { cost: 10000, margin: 85, price: 18500 }
      },
      costPrice: 2500,
      margin: 176,
      price: 6900,
      period: "30 días",
      icon: "Clapperboard",
      gradient: "from-purple-600 to-blue-800",
      description: "Las mejores películas de Warner Bros, sagas icónicas, series multipremiadas y eventos deportivos.",
      benefits: [
        "Perfil Personal (1 Pantalla Full HD · 30 días)",
        "Perfil Platino 4K (1 Pantalla Ultra HD + Deportes en vivo · 30 días)",
        "Cuenta Completa Familiar (4 Pantallas simultáneas · 5 Perfiles · 30 días)",
        "Calidad 4K con Dolby Vision y Dolby Atmos"
      ]
    },
    {
      id: "prime-video",
      name: "Prime Video HD",
      category: "streaming",
      badge: "Recomendado",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Personal (1 Pantalla · 1 Mes)",
        "Perfil Personal (1 Pantalla · 3 Meses)",
        "Cuenta Completa Familiar (3 Pantallas · 1 Mes)",
        "Cuenta Completa Anual (3 Pantallas · 12 Meses)"
      ],
      planPricing: {
        "Perfil Personal (1 Pantalla · 1 Mes)": { cost: 2500, margin: 176, price: 6900 },
        "Perfil Personal (1 Pantalla · 3 Meses)": { cost: 6000, margin: 132, price: 13900 },
        "Cuenta Completa Familiar (3 Pantallas · 1 Mes)": { cost: 6000, margin: 115, price: 12900 },
        "Cuenta Completa Anual (3 Pantallas · 12 Meses)": { cost: 25000, margin: 80, price: 45000 }
      },
      costPrice: 2500,
      margin: 176,
      price: 6900,
      period: "30 días / Anual",
      icon: "PlaySquare",
      gradient: "from-sky-600 to-blue-900",
      description: "Series exclusivas, cine internacional, producciones originales de Amazon Prime y estrenos semanales.",
      benefits: [
        "Perfil Personal (1 Pantalla privada con PIN · 1 Mes o 3 Meses)",
        "Cuenta Completa Familiar (3 Pantallas simultáneas · 7 Perfiles)",
        "Catálogo completo de cine, series originales y producciones argentinas",
        "Soporte y garantía durante todo el período contratado"
      ]
    },
    {
      id: "crunchyroll-mega-fan",
      name: "Crunchyroll Mega Fan (Anime)",
      category: "streaming",
      badge: "Anime Simulcast",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Personal (1 Pantalla · 1 Mes)",
        "Perfil Personal Anual (1 Pantalla · 12 Meses)",
        "Cuenta Completa Mega Fan (4 Pantallas · 1 Mes)"
      ],
      planPricing: {
        "Perfil Personal (1 Pantalla · 1 Mes)": { cost: 2000, margin: 195, price: 5900 },
        "Perfil Personal Anual (1 Pantalla · 12 Meses)": { cost: 15000, margin: 86, price: 27900 },
        "Cuenta Completa Mega Fan (4 Pantallas · 1 Mes)": { cost: 6000, margin: 115, price: 12900 }
      },
      costPrice: 2000,
      margin: 195,
      price: 5900,
      period: "30 días / Anual",
      icon: "Zap",
      gradient: "from-orange-500 to-amber-700",
      description: "La biblioteca de anime más grande del mundo sin publicidad, con simulcast 1 hora después de Japón.",
      benefits: [
        "Perfil Personal (1 Pantalla · Sin publicidad · Simulcast con Japón)",
        "Cuenta Completa Mega Fan (4 Pantallas simultáneas · Modo offline)",
        "Plan Anual con ahorro exclusivo para fanáticos",
        "Audio original japonés subtitulado y doblajes en español latino"
      ]
    },
    {
      id: "paramount-plus",
      name: "Paramount+",
      category: "streaming",
      badge: "Series & Cine",
      hasPlanSelector: true,
      planOptions: [
        "Perfil Personal (1 Pantalla · 30 días)",
        "Perfil Exclusivo Único Dueño (1 Pantalla · 30 días)"
      ],
      planPricing: {
        "Perfil Personal (1 Pantalla · 30 días)": { cost: 2500, margin: 176, price: 6900 },
        "Perfil Exclusivo Único Dueño (1 Pantalla · 30 días)": { cost: 6000, margin: 115, price: 12900 }
      },
      costPrice: 2500,
      margin: 176,
      price: 6900,
      period: "30 días",
      icon: "Star",
      gradient: "from-blue-700 to-indigo-950",
      description: "Contenido de Showtime, CBS, MTV, Nickelodeon, Comedy Central y partidos exclusivos.",
      benefits: [
        "Perfil Personal (1 Pantalla · Catálogo completo · 30 días)",
        "Perfil Exclusivo Único Dueño (1 Pantalla sin compartir · 30 días)",
        "Transmisiones deportivas exclusivas y producciones originales",
        "Activación inmediata y soporte garantizado"
      ]
    },
    {
      id: "universal-plus",
      name: "Universal+",
      category: "streaming",
      badge: "Series Premium",
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Compass",
      gradient: "from-indigo-600 to-purple-800",
      description: "Los 5 canales premium de Universal en una sola suscripción: Cinema, Premiere, Comedy, Crime y Reality.",
      benefits: [
        "Las 5 señales temáticas de Universal sin cortes",
        "Series policiales, comedia y reality shows exclusivos",
        "Películas taquilleras de Universal Pictures",
        "Calidad Full HD y sonido de alta fidelidad"
      ]
    },
    {
      id: "vix-premium",
      name: "ViX+ Premium",
      category: "streaming",
      badge: "Fútbol en Español",
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
    // PILAR 2: HERRAMIENTAS PARA CREADORES & IA
    // --------------------------------------------------------------------------
    {
      id: "capcut-pro",
      name: "CapCut Pro Team",
      category: "creadores-ia",
      badge: "Top Creadores",
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
      costPrice: 3200,
      margin: 60,
      price: calcSalePrice(3200, 60),
      period: "30 días",
      icon: "Palette",
      gradient: "from-cyan-500 to-blue-600",
      description: "Diseño gráfico profesional para redes, folletos y presentaciones sin límites creativos.",
      benefits: [
        "Quitafondos mágico de imágenes y videos en 1 clic",
        "+100 millones de fotos, videos y elementos Pro",
        "Kit de marcas con tus tipografías y paletas",
        "Redimensionamiento mágico de diseños"
      ]
    },
    {
      id: "chatgpt-plus",
      name: "ChatGPT Plus",
      category: "creadores-ia",
      badge: "IA Avanzada",
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días",
      icon: "Bot",
      gradient: "from-emerald-500 to-teal-800",
      description: "El modelo de lenguaje más inteligente del mundo para redacción, programación, análisis y estudio.",
      benefits: [
        "Acceso preferencial a GPT-4o sin demoras",
        "Generador de imágenes fotorrealistas con DALL-E 3",
        "Análisis avanzado de datos, planillas y PDFs",
        "Navegación web en tiempo real"
      ]
    },
    {
      id: "gemini-pro-cloud",
      name: "Gemini Pro + 5TB Cloud",
      category: "creadores-ia",
      badge: "18 Meses + 5TB",
      costPrice: 22400,
      margin: 35,
      price: calcSalePrice(22400, 35),
      period: "18 meses",
      icon: "Cpu",
      gradient: "from-blue-500 to-purple-600",
      description: "Plan extendido con el modelo más potente de Google y un enorme almacenamiento en la nube para tus archivos.",
      benefits: [
        "Acceso ilimitado a Gemini Ultra y Advanced",
        "5 Terabytes (5.000 GB) de almacenamiento en Google Cloud",
        "Integración directa con Docs, Gmail y Drive",
        "Duración extendida garantizada de 18 meses"
      ]
    },
    {
      id: "video-ia-pro",
      name: "Video IA Pro",
      category: "creadores-ia",
      badge: "Generador IA",
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días",
      icon: "Wand2",
      gradient: "from-fuchsia-600 to-pink-800",
      description: "Generá avatares realistas que hablan, cloná tu propia voz y creá videos virales desde texto en segundos.",
      benefits: [
        "Avatares humanos hiperrealistas con sincronización labial",
        "Clonación de voz en más de 20 idiomas",
        "Generación automática de guiones con IA",
        "Exportación en alta definición sin marcas de agua"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 3: CONECTIVIDAD & DATOS ILIMITADOS (SELECTOR PERSONAL VS CLARO)
    // --------------------------------------------------------------------------
    {
      id: "internet-movil-ilimitado",
      name: "Internet Móvil Ilimitado",
      category: "conectividad",
      badge: "Datos Ilimitados",
      highlight: true,
      hasCarrierSelector: true,
      carriers: ["Personal", "Claro"],
      carrierPricing: {
        Personal: {
          costPrice: 1920,
          margin: 60,
          price: calcSalePrice(1920, 60),
          tag: "Personal 4G/5G"
        },
        Claro: {
          costPrice: 3200,
          margin: 40,
          price: calcSalePrice(3200, 40),
          tag: "Claro 4G/5G"
        }
      },
      costPrice: 3200,
      margin: 40,
      price: calcSalePrice(3200, 40),
      period: "30 días",
      icon: "Wifi",
      gradient: "from-cyan-500 to-blue-700",
      description: "Navegá sin límites desde tu celular sin gastar saldo ni abono mediante servidores VPN privados de alta velocidad.",
      benefits: [
        "Seleccioná tu línea: Personal o Claro",
        "Consumo ilimitado de datos para YouTube, TikTok, Netflix y descargas",
        "No consume tu saldo de recarga ni datos de abono",
        "Aplicación fácil de conectar con soporte guiado paso a paso",
        "Velocidad 4G/5G con baja latencia para juegos online"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 4: TELEVISIÓN DIGITAL & IPTV (12 PLATAFORMAS COMPLETAS)
    // --------------------------------------------------------------------------
    {
      id: "tv-digital-premium-pack-futbol",
      name: "TV Digital Premium + Pack Fútbol",
      category: "iptv",
      badge: "3 Pantallas · Más Pedido 🔥",
      highlight: true,
      costPrice: 5920,
      margin: 40,
      price: calcSalePrice(5920, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-blue-600 to-cyan-600",
      description: "Ideal para ver todo el fútbol argentino e internacional en vivo. Incluye canales premium de deportes, cine, series y contenido infantil en HD y Full HD.",
      benefits: [
        "⏱ Entrega rápida: 15 min a 1 hs (7:30 a 00:30 hs)",
        "3 pantallas simultáneas en alta definición",
        "Pack Fútbol completo (ESPN Premium, TNT Sports)",
        "Guía de programación interactiva y canales 24/7"
      ]
    },
    {
      id: "vision-digital-tv",
      name: "Vision Digital TV",
      category: "iptv",
      badge: "4 Pantallas · Ultra Estable",
      costPrice: 5600,
      margin: 40,
      price: calcSalePrice(5600, 40),
      period: "30 días · 4 pantallas",
      icon: "MonitorPlay",
      gradient: "from-cyan-600 to-indigo-700",
      description: "Servicio de televisión digital con 4 accesos simultáneos y servidores de alto rendimiento optimizados para evitar cortes durante eventos masivos.",
      benefits: [
        "⏱ Entrega estimada: 30 min a 6 hs máx",
        "4 pantallas en simultáneo para toda la familia",
        "Gran estabilidad en partidos de alta audiencia",
        "Compatible con Smart TV, TV Box, Firestick y celulares"
      ]
    },
    {
      id: "tv-digital-lumix",
      name: "TV Digital Lumix",
      category: "iptv",
      badge: "4 Pantallas · Máxima Fluidez",
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días · 4 pantallas",
      icon: "Tv",
      gradient: "from-purple-600 to-blue-700",
      description: "Plataforma moderna con interfaz ágil, cambio rápido de canal y una amplia grilla de señales nacionales, internacionales y eventos PPV.",
      benefits: [
        "⏱ Entrega estimada: 20 min a 12 hs",
        "4 pantallas simultáneas",
        "Servidores con balanceo de carga continuo",
        "Fútbol argentino, copas internacionales y cine"
      ]
    },
    {
      id: "gs-play-hd",
      name: "GS Play HD",
      category: "iptv",
      badge: "3 Pantallas · Sin Interrupciones",
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días · 3 pantallas",
      icon: "PlaySquare",
      gradient: "from-teal-600 to-emerald-700",
      description: "Disfrutá donde quieras y cuando quieras sin interrupciones. Grilla optimizada con canales premium, series y películas a demanda.",
      benefits: [
        "⏱ Entrega estimada: 2 a 24 hs",
        "3 pantallas simultáneas",
        "Transmisiones fluidas con excelente compresión",
        "Soporte post-venta garantizado"
      ]
    },
    {
      id: "tv-digital-especial-roku",
      name: "TV Digital Especial ROKU",
      category: "iptv",
      badge: "3 Pantallas · Optimizado ROKU",
      costPrice: 5120,
      margin: 40,
      price: calcSalePrice(5120, 40),
      period: "30 días · 3 pantallas",
      icon: "Tv",
      gradient: "from-violet-600 to-purple-800",
      description: "Especialmente optimizado para televisores y dispositivos con sistema operativo Roku. Configuración guiada sin complicaciones.",
      benefits: [
        "⏱ Entrega estimada: 1 a 24 hs",
        "3 pantallas simultáneas",
        "100% compatible con Roku TV y Roku Express/Streaming Stick",
        "Todos los canales deportivos y señales en vivo"
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
        "Selector de plan: Estándar o Full con grilla completa",
        "3 pantallas simultáneas",
        "Fútbol argentino en directo y señales premium"
      ]
    },
    {
      id: "tv-digital-argentum",
      name: "TV Digital Argentum",
      category: "iptv",
      badge: "3 Pantallas · Calidad Superior",
      costPrice: 8000,
      margin: 40,
      price: calcSalePrice(8000, 40),
      period: "30 días · 3 pantallas",
      icon: "Monitor",
      gradient: "from-amber-600 to-orange-700",
      description: "Servidor premium de alta tasa de bits (bitrate) para quienes buscan nitidez visual impecable y respuesta inmediata.",
      benefits: [
        "⏱ Entrega estimada: 2 a 6 hs",
        "3 pantallas simultáneas",
        "Máxima fidelidad de video en eventos deportivos",
        "Biblioteca de contenidos a demanda actualizada semanalmente"
      ]
    },
    {
      id: "iptv-flujo-tv",
      name: "IPTV Flujo TV",
      category: "iptv",
      badge: "3 Pantallas · Premium Ultra",
      costPrice: 9120,
      margin: 40,
      price: calcSalePrice(9120, 40),
      period: "30 días · 3 pantallas",
      icon: "Zap",
      gradient: "from-rose-600 to-red-800",
      description: "La plataforma IPTV más robusta del mercado. Infraestructura de streaming avanzada diseñada para transmisiones deportivas sin lag ni congelamientos.",
      benefits: [
        "⏱ Entrega estimada: 1 a 12 hs",
        "3 pantallas simultáneas con rendimiento tope de gama",
        "Eventos deportivos internacionales y locales",
        "Soporte prioritario"
      ]
    },
    {
      id: "pack-tv-digital-4-pantallas",
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
        "4 pantallas en simultáneo para disfrutar en familia",
        "Variantes de servidor: Básico, Plus y Premium",
        "Canales en vivo, cine y series"
      ]
    },
    {
      id: "directv-go-dgo",
      name: "DirecTV GO (DGO)",
      category: "iptv",
      badge: "Oficial & Deportes",
      costPrice: 6400,
      margin: 40,
      price: calcSalePrice(6400, 40),
      period: "30 días",
      icon: "Tv",
      gradient: "from-blue-600 to-sky-800",
      description: "La plataforma oficial de DirecTV con canales en directo, transmisiones de DSPORTS exclusivas y contenido on demand.",
      benefits: [
        "Transmisiones exclusivas de DSPORTS y eventos oficiales",
        "Guía de televisión interactiva y retroceso de programación",
        "Compatible con Smart TVs, Chromecast y dispositivos móviles",
        "Activación rápida con cuenta garantizada"
      ]
    },
    {
      id: "mio-tv",
      name: "Mio TV",
      category: "iptv",
      badge: "Señales Digitales",
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Monitor",
      gradient: "from-indigo-600 to-violet-800",
      description: "Señales digitales con servidores balanceados, grilla variada de entretenimiento y canales deportivos para disfrutar en casa.",
      benefits: [
        "Grilla variada de canales nacionales e internacionales",
        "Excelente fluidez en conexiones de internet estándar",
        "Fácil configuración en cualquier Smart TV o TV Box",
        "Soporte continuo durante todo el mes"
      ]
    },
    {
      id: "plex-tv",
      name: "Plex TV (Servidor Multimedia)",
      category: "iptv",
      badge: "Cine a Demanda",
      costPrice: 4800,
      margin: 40,
      price: calcSalePrice(4800, 40),
      period: "30 días",
      icon: "Clapperboard",
      gradient: "from-amber-500 to-yellow-700",
      description: "Acceso a servidores privados con catálogos masivos de películas en 4K/1080p, sagas completas y series actualizadas día a día.",
      benefits: [
        "Biblioteca masiva de películas y series sin cortes",
        "Calidad cinematográfica con audio en español y subtítulos",
        "Interfaz idéntica a Netflix / plataformas premium",
        "Reproducción fluida desde cualquier dispositivo"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 5: CRECIMIENTO EN REDES (SMM) — SERVICIO BASE INTEGRADO
    // --------------------------------------------------------------------------
    {
      id: "paquete-redes-smm",
      name: "Crecimiento en Redes (SMM)",
      category: "smm",
      badge: "100% Seguro",
      highlight: true,
      isSpecialSMM: true,
      costPrice: 380,
      margin: 80,
      price: calcSalePrice(380, 80),
      period: "Servicio por entrega",
      icon: "TrendingUp",
      gradient: "from-pink-500 via-purple-600 to-indigo-600",
      description: "Impulsá tu presencia digital. Seguidores, likes, vistas y reproducciones para Instagram, Facebook, TikTok, YouTube y WhatsApp sin pedir contraseñas.",
      benefits: [
        "100% seguro: solo con tu enlace o @usuario público (sin contraseñas)",
        "Opciones segmentadas: Seguidores Latinos, Argentinos o Globales",
        "Vistas para Reels y Videos, Likes e interacción real garantizada",
        "Activación gradual para proteger la reputación de tu cuenta"
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
      badge: "Mega Combo · Ahorro .900",
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
        "💰 Ahorro de .900 comprando el combo conjunto",
        "⚡ Todo lo necesario para vender, cobrar y gestionar desde el día 1",
        "🛡️ Asesoramiento y activación guiada por WhatsApp"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 7: ZONA GAMER — PS4, PS5, PS3 & PC (BLOQUE A: PACKS Y EMULADORES)
    // --------------------------------------------------------------------------
    {
      id: "combo-gamer-bronce",
      name: "Combo Gamer Bronce (2 Juegos PS4/PS5)",
      category: "zona-gamer",
      badge: "Promo Bronce",
      costPrice: 15000,
      margin: 0,
      price: calcGamerSalePrice(15000, 7000),
      isGamerProduct: true,
      hasGamerPackSelectors: true,
      gamerPool: [
        "Mortal Kombat 11",
        "Fallout 4",
        "Metro Exodus",
        "Unravel Two",
        "La Tierra Media: Shadow of War",
        "Injustice 2",
        "Batman: Return to Arkham",
        "Naruto to Boruto: Shinobi Striker",
        "LEGO Jurassic World",
        "Metro Redux",
        "Burnout Paradise",
        "Star Wars Squadrons",
        "Inside",
        "Wolfenstein: The New Order",
        "Monster Energy Supercross 6",
        "Sniper Ghost Warrior",
        "Unravel",
        "LEGO Worlds",
        "LEGO Harry Potter Collection",
        "Dead Island",
        "MXGP 21",
        "Overcooked",
        "LEGO Marvel Avengers"
      ],
      period: "Cuenta Primaria Permanente",
      icon: "Gamepad2",
      gradient: "from-amber-700 via-orange-800 to-amber-950",
      description: "Elegí 2 juegazos de la lista para jugar desde tu propio usuario de PlayStation. Trofeos, guardado y multijugador online intactos.",
      benefits: [
        "🎮 2 Juegos a elección de una lista de 23 títulos destacados",
        "🔑 Cuenta Primaria original: jugás desde tu perfil personal",
        "🏆 Trofeos oficiales y juego en línea habilitado",
        "🛡️ Garantía de activación y soporte permanente"
      ]
    },
    {
      id: "combo-gamer-plata",
      name: "Combo Gamer Plata (2 Juegos PS4/PS5)",
      category: "zona-gamer",
      badge: "Promo Plata",
      costPrice: 20000,
      margin: 0,
      price: calcGamerSalePrice(20000, 7000),
      isGamerProduct: true,
      hasGamerPackSelectors: true,
      gamerPool: [
        "A Way Out",
        "Mafia: Definitive Edition",
        "Hogwarts Legacy",
        "LEGO Star Wars: The Skywalker Saga",
        "The Quarry",
        "Star Wars Jedi: Fallen Order",
        "Marvel's Midnight Suns",
        "LEGO Harry Potter Collection",
        "Borderlands 3",
        "Kingdom Come: Deliverance",
        "Assetto Corsa Competizione",
        "Terraria",
        "Chivalry 2",
        "Need for Speed Heat",
        "Marvel's Guardians of the Galaxy",
        "Back 4 Blood",
        "Need for Speed Rivals",
        "LEGO Marvel Collection",
        "Human: Fall Flat",
        "Need for Speed Hot Pursuit",
        "Saints Row",
        "Borderlands GOTY",
        "Resident Evil Revelations 1 + 2",
        "Blasphemous 2",
        "Jurassic World Evolution",
        "Titanfall 2",
        "F1 Manager 2024",
        "The Evil Within Bundle"
      ],
      period: "Cuenta Primaria Permanente",
      icon: "Gamepad2",
      gradient: "from-slate-400 via-zinc-600 to-slate-800",
      description: "Accedé a 2 títulos de primer nivel entre 28 juegos aclamados (Hogwarts Legacy, Mafia, Star Wars, Resident Evil y más).",
      benefits: [
        "🎮 2 Juegos a elección entre 28 títulos de gran calibre",
        "🔑 Cuenta Primaria 100% original en tu consola",
        "🏆 Jugás desde tu usuario propio con trofeos",
        "⚡ Entrega rápida con instructivo paso a paso"
      ]
    },
    {
      id: "combo-gamer-oro",
      name: "Combo Gamer Oro (2 Juegos PS4/PS5)",
      category: "zona-gamer",
      badge: "Promo Oro 🔥",
      highlight: true,
      costPrice: 25000,
      margin: 0,
      price: calcGamerSalePrice(25000, 7000),
      isGamerProduct: true,
      hasGamerPackSelectors: true,
      gamerPool: [
        "Fallout 76",
        "Marvel's Spider-Man GOTY",
        "Resident Evil 7 Gold",
        "Dragon Ball FighterZ",
        "Tekken 7",
        "Sniper Elite 5",
        "The Order: 1886",
        "Stranded Deep",
        "LEGO Bundle (Batman 3 + Villains + Movie 1+2)",
        "Little Nightmares 2",
        "MotoGP 25",
        "Farming Simulator 17",
        "It Takes Two",
        "Mafia Trilogy",
        "Metro Bundle",
        "God of War 3 Remastered",
        "Overcooked! All You Can Eat",
        "Dying Light 2",
        "Sifu",
        "Resident Evil 2",
        "Resident Evil Triple Pack",
        "Plants vs. Zombies: Replanted",
        "DIRT 5",
        "Jurassic World Evolution 2",
        "Darksiders 2",
        "F1 2021",
        "FIFA 21"
      ],
      period: "Cuenta Primaria Permanente",
      icon: "Gamepad2",
      gradient: "from-yellow-500 via-amber-600 to-yellow-800",
      description: "El combo definitivo con los juegos más taquilleros: Spider-Man, God of War, Resident Evil, Dying Light 2, Tekken 7 y más.",
      benefits: [
        "🎮 2 Juegos top a elección entre 27 joyas de los videojuegos",
        "🔑 Cuenta Primaria permanente para tu PS4 o PS5",
        "🏆 Guardado en la nube de tu perfil y trofeos personales",
        "🛡️ Garantía total anti-bloqueos"
      ]
    },
    {
      id: "emulador-pc-cloud",
      name: "Emulador PC Cloud Multi-Consola + Netplay Online",
      category: "zona-gamer",
      badge: "PC Gamer Cloud",
      costPrice: 15000,
      margin: 0,
      price: calcGamerSalePrice(15000, 7000),
      isGamerProduct: true,
      period: "Acceso Permanente",
      icon: "Cpu",
      gradient: "from-cyan-600 to-blue-900",
      description: "Sistema de descarga desde la nube para PC (descargás solo el juego que querés jugar sin llenar el disco duro). Incluye multijugador online Netplay y guía paso a paso.",
      benefits: [
        "🕹️ Consolas: PS1, PS2, PS3, PS4, Xbox, Xbox 360, Xbox One, Neo Geo, Nintendo DS y más",
        "🌐 Modo multijugador online Netplay para jugar con amigos a distancia",
        "☁️ Descarga bajo demanda: jugás sin ocupar espacio innecesario en disco",
        "📹 Guía escrita y video tutorial paso a paso incluido"
      ]
    },
    {
      id: "pack-retro-ps3",
      name: "Pack Retro PS3 — Promo 3 Juegos a Elección",
      category: "zona-gamer",
      badge: "+340 Juegos PS3",
      costPrice: 10000,
      margin: 0,
      price: calcGamerSalePrice(10000, 7000),
      isGamerProduct: true,
      hasPs3CustomInput: true,
      period: "Cuenta Primaria Permanente",
      icon: "Gamepad2",
      gradient: "from-indigo-600 to-purple-900",
      description: "Elegí 3 juegos completos de PlayStation 3 entre más de 340 títulos legendarios disponibles para descargar directamente.",
      benefits: [
        "🎮 3 juegos a elección de una biblioteca de +340 títulos de PS3",
        "🔑 Instalación directa en tu consola (digital primaria)",
        "🏆 Trofeos, guardado y juego desde tu perfil personal",
        "🛡️ Soporte y asesoramiento para la descarga"
      ]
    },
    {
      id: "pack-futbol-android-offline",
      name: "Pack Fútbol Android Offline + Dragon Ball Sparking! Zero MOD",
      category: "zona-gamer",
      badge: "Juegos Celular Offline",
      costPrice: 0,
      margin: 100,
      price: 5500,
      period: "Descarga Directa Vitalicia",
      icon: "Smartphone",
      gradient: "from-emerald-600 to-teal-900",
      description: "Para jugar en tu celular Android sin conexión a internet ni gastar datos. Incluye los mejores emuladores y MODs actualizados.",
      benefits: [
        "📱 Emulador PPSSPP Gold configurado al máximo rendimiento",
        "⚽ EA Sports FC 25 Offline y PES 2024 Season Update (Cámara PS5 HD)",
        "🔥 PES 2023, Football League 2024, FIFA Street 2 MOD y PES 2014",
        "💥 Dragon Ball: Sparking! ZERO MOD en Español con video tutorial"
      ]
    },
    {
      id: "kit-liberacion-consolas",
      name: "Kit Liberación Consolas (PS3 HEN / Xbox 360) + Bóveda +300 Juegos",
      category: "zona-gamer",
      badge: "Guía + Bóveda USB",
      costPrice: 0,
      margin: 100,
      price: 8500,
      period: "Guía + Bóveda Completa",
      icon: "HardDrive",
      gradient: "from-purple-600 to-violet-950",
      description: "Kit completo con video tutorial, firmware y herramientas para liberar tu PS3 o Xbox 360 por USB, más acceso a bibliotecas masivas.",
      benefits: [
        "🔧 PS3 HEN 4.92 / Xbox 360 USB paso a paso con video explicativo",
        "📦 Bóveda privada con +300 juegos de PS3 listos para descargar",
        "👾 Colección retro de regalo con más de 25.000 juegos clásicos",
        "🛡️ 100% seguro sin riesgo de baneo"
      ]
    },

    // --------------------------------------------------------------------------
    // PILAR 8: MEGA PACKS DIGITALES (+14 TB / ACCESO VITALICIO POST-PAGO)
    // --------------------------------------------------------------------------
    {
      id: "mega-pack-vip-boveda",
      name: "Pase VIP Bóveda Total Sonri (+14 TB Todo Incluido)",
      category: "mega-packs",
      badge: "OFERTA ESTRELLA 🔥",
      highlight: true,
      costPrice: 0,
      margin: 100,
      price: 14900,
      period: "Acceso Vitalicio (+14 TB)",
      icon: "FolderArchive",
      gradient: "from-cyan-500 via-purple-600 to-pink-500",
      description: "Acceso ilimitado y de por vida a la bóveda más grande de la web: +14 Terabytes de formación, software, cursos, libros y recursos de todas las categorías.",
      benefits: [
        "Colección completa de 81 Mega Packs temáticos organizados",
        "Más de 300.000 cursos profesionales en video HD paso a paso",
        "Diseño gráfico, edición de video, 3D, VFX y sublimación",
        "Programación Full Stack, desarrollo de apps móviles, Python e IA",
        "Academia de oficios técnicos con salida laboral inmediata",
        "Negocios digitales, marketing de afiliados, e-commerce y trading",
        "Idiomas políglota: Inglés sin Barreras, Alemán, Chino, Coreano y Ruso",
        "Biblioteca universal: +15.000 libros PDF/EPUB y +1.800 audiolibros",
        "Bonus: Cómics Marvel/DC, historietas retro y +25.000 juegos clásicos",
        "Canales VIP privados con soporte y actualizaciones permanentes"
      ],
      syllabus: [
        "Módulo 1: Bóveda Central con la Colección de 81 Mega Packs Temáticos",
        "Módulo 2: Academia de Programación Full Stack, Python, Apps Móviles, IA y Cloud",
        "Módulo 3: Bóveda de Diseño Gráfico, Edición de Video (Premiere, After Effects, CapCut), VFX y Sublimación",
        "Módulo 4: Academia de Oficios Técnicos (Celulares, Refrigeración, Electricidad, Mecánica, Consolas)",
        "Módulo 5: Negocios, E-commerce, Embudos de Venta, Marketing Digital y los 5 Cursos de Trading",
        "Módulo 6: Idiomas Políglota (Inglés sin Barreras, Alemán, Chino Mandarín, Coreano, Ruso)",
        "Módulo 7: Biblioteca Digital Masiva (+15.000 Libros y +1.800 Audiolibros en Español)",
        "Módulo 8: Música, Guitarras, Producción Musical DJ, Cine Latino y Cómics de Marvel/DC"
      ]
    },
    {
      id: "mega-pack-diseno-grafico",
      name: "Mega Pack Diseñador Gráfico, Edición & Sublimación",
      category: "mega-packs",
      badge: "+3 Terabytes",
      costPrice: 0,
      margin: 100,
      price: 6900,
      period: "Descarga Vitalicia",
      icon: "Palette",
      gradient: "from-pink-500 via-purple-600 to-indigo-700",
      description: "El arsenal definitivo para diseñadores, editores y talleres de sublimación. Recursos premium listos para usar en tus proyectos o clientes.",
      benefits: [
        "+25.000 fuentes tipográficas premium para todo tipo de marcas",
        "+1.000 flyers publicitarios 100% editables en Photoshop y Canva",
        "Mockups hiperrealistas de indumentaria, cartelería y papelería",
        "+25.000 estampas, vectores y diseños listos para tazas y remeras",
        "Plantillas y efectos para After Effects, Premiere Pro y CapCut PC",
        "Cursos completos desde cero de Canva Pro, Photoshop, Illustrator y Premiere"
      ],
      syllabus: [
        "Módulo Tipografías: +25.000 fuentes clasificadas (Serif, Sans, Caligráficas, Display)",
        "Módulo Redes Sociales: +1.000 flyers y plantillas editables para Instagram y Facebook",
        "Módulo Sublimación & Estampado: +25.000 vectores listos para imprimir en remeras, tazas y gorras",
        "Módulo Mockups: Presentaciones fotográficas de alta gama para productos y marcas",
        "Módulo Video & Motion Graphics: Transiciones, overlays y proyectos editables para After Effects y Premiere",
        "Módulo Cursos: Formación en Photoshop, Illustrator, Premiere Pro y diseño en Canva"
      ]
    },
    {
      id: "mega-pack-oficios-reparacion",
      name: "Academia de Oficios con Salida Laboral, Reparación y Gastronomía",
      category: "mega-packs",
      badge: "Salida Laboral Rápida",
      costPrice: 0,
      margin: 100,
      price: 6900,
      period: "Formación Vitalicia",
      icon: "Briefcase",
      gradient: "from-amber-500 via-orange-600 to-red-700",
      description: "Aprendé oficios altamente demandados para generar ingresos inmediatos prestando servicios técnicos o iniciando tu propio taller.",
      benefits: [
        "Reparación de celulares y tablets (hardware, pantallas, microsoldadura y software)",
        "Reparación y mantenimiento de notebooks y computadoras de escritorio (PC)",
        "Servicio técnico de consolas (PlayStation 1, 2, 3, 4 y consolas Nintendo)",
        "Línea blanca: Reparación de heladeras, aires acondicionados, lavarropas y microondas",
        "Instalaciones eléctricas domiciliarias, energía solar y plomería moderna",
        "+200 planos detallados para construcción de muebles en melamina y madera",
        "Costura, crochet, resina epoxi, barbería profesional y gastronomía artesanal"
      ],
      syllabus: [
        "Taller de Telefonía Móvil: Desarme, cambio de módulos, diagnóstico con tester y software",
        "Taller de Informática: Mantenimiento preventivo, armado de PC gamer y reparación de notebooks",
        "Servicio Técnico de Consolas: Mantenimiento, reemplazo de lectores, pasta térmica y chipeo",
        "Refrigeración & Climatización: Carga de gas, diagnóstico de compresores e instalación de Split",
        "Línea Blanca del Hogar: Reparación de lavarropas automáticos, microondas y hornos eléctricos",
        "Electricidad Domiciliaria & Paneles Solares: Circuitos seguros y energías renovables",
        "Carpintería & Melamina: +200 planos con despiece para armar cocinas, placares y escritorios",
        "Oficios Creativos & Barbería: Resina epoxi para mesas, barbería moderna y gastronomía"
      ]
    },
    {
      id: "mega-pack-programacion-ia",
      name: "Mega Pack Programación, IA, Office y Arquitectura (AutoCAD/BIM)",
      category: "mega-packs",
      badge: "Tech & Arquitectura",
      costPrice: 0,
      margin: 100,
      price: 7500,
      period: "Acceso Completo",
      icon: "Cpu",
      gradient: "from-cyan-500 via-blue-600 to-indigo-800",
      description: "Formación de nivel profesional en desarrollo de software, inteligencia artificial, herramientas corporativas y diseño arquitectónico.",
      benefits: [
        "Programación Full Stack: Python desde cero, JavaScript, React, Node.js",
        "Lenguajes de alta demanda: Java, C++, Linux avanzado, MySQL y PostgreSQL",
        "Big Data, DevOps, Docker y selección de cursos premium de Platzi",
        "Creación de aplicaciones para Android e Inteligencia Artificial con ChatGPT",
        "Ofimática Corporativa: Excel avanzado con macros, Word y PowerPoint",
        "Arquitectura e Ingeniería: Cursos e instalador de AutoCAD 2021, Archicad, Tekla e Infraworks"
      ],
      syllabus: [
        "Ruta Full Stack: HTML5, CSS3, JavaScript moderno, React y desarrollo web responsivo",
        "Ruta Backend & Python: Python de cero a avanzado, lógica de algoritmos, APIs y automatización",
        "Bases de Datos & Cloud: Modelado relacional en MySQL, administración de servidores Linux y Docker",
        "Desarrollo Móvil: Creación de apps para Android con interfaces modernas",
        "Inteligencia Artificial: Prompt engineering con ChatGPT, Claude, Midjourney y automatizaciones",
        "Master en Microsoft Office: Excel para finanzas, macros, tablas dinámicas y análisis de datos",
        "Arquitectura e Ingeniería CAD/BIM: Cursos e instaladores de AutoCAD, Archicad e Infraworks"
      ]
    },
    {
      id: "mega-pack-emprendedor-trading",
      name: "Pack Emprendedor, Marketing Digital & Trading",
      category: "mega-packs",
      badge: "Negocios & Finanzas",
      costPrice: 0,
      margin: 100,
      price: 6500,
      period: "Acceso Permanente",
      icon: "TrendingUp",
      gradient: "from-emerald-500 via-teal-600 to-blue-700",
      description: "Todo el conocimiento estratégico para fundar tu negocio, vender por internet de forma rentable y dominar las inversiones en los mercados financieros.",
      benefits: [
        "Pack Emprender: Guías legales, estructura empresarial y modelos escalables",
        "Biblioteca de +620 libros fundamentales para emprendedores y finanzas",
        "17 cursos completos de Marketing Digital y pauta publicitaria en Meta Ads",
        "WhatsApp Marketing y automatización de embudos de ventas (Funnels)",
        "E-commerce profesional, tiendas online y modelos de Dropshipping",
        "5 cursos completos de Trading: Introducción, Borjatube, DTA y Plan de Trading"
      ],
      syllabus: [
        "Módulo Creación de Negocios: Validación de ideas, costos, margen y formalización comercial",
        "Módulo Biblioteca Emprendedora: +620 títulos clave de ventas, persuasión y finanzas",
        "Módulo Marketing Digital: 17 cursos completos de Meta Ads, Instagram Ads y Google Ads",
        "Módulo Embudos & WhatsApp: Mensajes de cierre de ventas, catálogos y automatización",
        "Módulo E-commerce: Tiendas virtuales, pasarelas de pago y logística de entrega",
        "Módulo Trading Profesional: Los 5 cursos completos de análisis técnico y gestión de riesgo"
      ]
    },
    {
      id: "mega-pack-idiomas-poliglota",
      name: "Pack Idiomas Políglota (Inglés, Alemán, Coreano, Chino y Ruso)",
      category: "mega-packs",
      badge: "5 Idiomas Clave",
      costPrice: 0,
      margin: 100,
      price: 5500,
      period: "Acceso Vitalicio",
      icon: "Sparkles",
      gradient: "from-sky-500 via-indigo-600 to-purple-700",
      description: "Dominá los idiomas más hablados y demandados del mundo con métodos prácticos, audio inmersivo y guías interactivas.",
      benefits: [
        "Inglés intensivo desde nivel básico hasta conversacional fluido",
        "Colección oficial completa: Los 4 manuales interactivos de 'Inglés sin Barreras'",
        "Guías de gramática práctica, vocabulario cotidiano y diálogos de la vida real",
        "Cursos completos de Alemán desde cero con ejercicios auditivos",
        "Curso de Coreano para principiantes y fanáticos de los K-Dramas",
        "Guía fonética de Chino Mandarín y manual de iniciación al Ruso"
      ],
      syllabus: [
        "Inglés sin Barreras: Los 4 manuales interactivos con audio y cuadernos de trabajo",
        "Inglés Conversacional: Expresiones idiomáticas, pronunciación nativa y entrevistas laborales",
        "Alemán A1 a B2: Vocabulario esencial, declinaciones y comprensión auditiva",
        "Coreano Práctico: Aprendizaje del alfabeto Hangul, gramática y frases de uso diario",
        "Chino Mandarín: Sistema Pinyin, tonos de pronunciación y caracteres básicos",
        "Ruso Elemental: Alfabeto cirílico, fonética y guía conversacional para viajeros"
      ]
    },
    {
      id: "mega-pack-biblioteca-audiolibros",
      name: "Mega Biblioteca Digital (+15.000 Libros + 1.800 Audiolibros)",
      category: "mega-packs",
      badge: "+15.000 Libros & Audio",
      costPrice: 0,
      margin: 100,
      price: 5500,
      period: "Acceso Vitalicio",
      icon: "BookOpen",
      gradient: "from-purple-600 via-pink-600 to-rose-700",
      description: "La colección de lectura y audio más grande en español. Llevá en tu celular una universidad entera clasificada por temáticas.",
      benefits: [
        "+15.000 libros en formatos universales PDF y EPUB clasificados por género",
        "+1.800 audiolibros narrados en español con alta calidad de sonido",
        "Bibliotecas universitarias: Medicina, Derecho, Ingeniería, Psicología y Psicoanálisis",
        "Salud mental, neurociencia, mindfulness, inteligencia emocional y hábitos",
        "Ciencia, divulgación científica (Carl Sagan), Física y Matemáticas",
        "Best-sellers: Las 48 leyes del poder, Rompe la barrera del NO, 12 reglas para la vida"
      ],
      syllabus: [
        "Biblioteca de Audiolibros: +1.800 títulos completos narrados en español neutro",
        "Desarrollo Personal & Liderazgo: Libros de Robert Greene, Jordan Peterson, Dale Carnegie",
        "Ciencia, Filosofía & Pensamiento Crítico: Colección Carl Sagan, Stephen Hawking y clásicos",
        "Psicología, Psiquiatría & Salud Emocional: Tratados clínicos y textos de divulgación",
        "Facultad Universitaria: Textos de referencia para Medicina, Leyes, Economía e Ingeniería",
        "Ficción & Novela: Grandes obras de la literatura universal, ciencia ficción y misterio"
      ]
    },
    {
      id: "mega-pack-musica-cine-comics",
      name: "Pack Música, Instrumentos, Producción DJ & Playlists + Bonus Cine/Cómics",
      category: "mega-packs",
      badge: "Música & Entretenimiento",
      costPrice: 0,
      margin: 100,
      price: 4900,
      period: "Acceso Permanente",
      icon: "Music2",
      gradient: "from-red-500 via-rose-600 to-purple-800",
      description: "Aprendé a tocar instrumentos, producir música electrónica y disfrutá de un bonus exclusivo de cine latino y cómics clásicos.",
      benefits: [
        "Cursos completos de Guitarra acústica y eléctrica desde principiante hasta solos",
        "Producción Musical y DJ: Técnicas de mezcla, masterización y software",
        "Teoría musical, armonía, partituras y técnica para teclado y piano",
        "Colección de playlists exclusivas Lo-Fi, Chillhop y bases instrumentales",
        "Bonus Cine: Acceso de regalo a carpetas con +100 Películas HD en audio Latino",
        "Bonus Coleccionista: Biblioteca digital con cómics de Marvel, DC Comics e Historietas Retro"
      ],
      syllabus: [
        "Curso Integral de Guitarra: Acordes, escalas, punteos, fingerpicking y repertorio",
        "Curso de Producción DJ & Home Studio: FL Studio, Ableton Live, ecualización y mezcla",
        "Teclado & Piano Popular: Acordes mayores, menores, acompañamientos y lectura ágil",
        "Bóveda Lo-Fi Beats: Cientos de pistas libres de copyright para concentrarse o monetizar",
        "Bonus Sala de Cine Latino: +100 películas taquilleras en 1080p con audio latino",
        "Bonus Bóveda Cómic: Miles de historietas digitales de Marvel, DC y clásicos del cómic"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. CATÁLOGO COMPLETO DE JUEGOS INDIVIDUALES PS4 & PS5 (277 TÍTULOS PRECARGADOS)
  // ----------------------------------------------------------------------------
  gamerIndividualGames: [
    {
        "id":  "ps-1",
        "title":  "007 First Light PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-2",
        "title":  "A Way Out",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-3",
        "title":  "Age of Empires II: Definitive Edition PS5",
        "cost":  25600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-4",
        "title":  "Alien: Isolation",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-5",
        "title":  "AO Tennis 2",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-6",
        "title":  "ARC Raiders PS5",
        "cost":  20300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-7",
        "title":  "Assassin\u0027s Creed Chronicles – Trilogy",
        "cost":  3600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-8",
        "title":  "Assassin\u0027s Creed Valhalla Español Latino",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-9",
        "title":  "Assassin\u0027s Creed Valhalla Complete Edition Español Latino",
        "cost":  32000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-10",
        "title":  "Assetto Corsa Competizione PS4 \u0026 PS5",
        "cost":  6600,
        "platform":  "PS4 / PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-11",
        "title":  "Assetto Corsa Ultimate Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-12",
        "title":  "Atomic Heart",
        "cost":  17900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-13",
        "title":  "Atomic Heart Ultimate Edition",
        "cost":  32000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-14",
        "title":  "Back 4 Blood: Ultimate Edition",
        "cost":  5800,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-15",
        "title":  "Batman: Arkham Collection",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-16",
        "title":  "Batman: Arkham Knight Premium Edition",
        "cost":  6900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-17",
        "title":  "Batman: Return to Arkham",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-18",
        "title":  "Battlefield 6 Standard Edition PS5",
        "cost":  27500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-19",
        "title":  "Bayonetta \u0026 Vanquish 10th Anniversary Bundle",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-20",
        "title":  "Ben 10",
        "cost":  9900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-21",
        "title":  "BioShock: The Collection",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-22",
        "title":  "Blasphemous 2",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-23",
        "title":  "Borderlands 3",
        "cost":  4300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-24",
        "title":  "Borderlands 3 Super Deluxe Edition",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-25",
        "title":  "Borderlands 4 PS5",
        "cost":  32000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-26",
        "title":  "Brothers: A Tale of Two Sons Remake PS5",
        "cost":  9300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-27",
        "title":  "Burnout Paradise Remastered",
        "cost":  4100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-28",
        "title":  "Chivalry 2",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-29",
        "title":  "Chrono Cross: The Radical Dreamers Edition",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-30",
        "title":  "Clair Obscur: Expedition 33 PS5",
        "cost":  35900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-31",
        "title":  "Cult of the Lamb: Unholy Edition",
        "cost":  16400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-32",
        "title":  "Dakar Desert Rally Deluxe Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-33",
        "title":  "Dead Island Definitive Collection",
        "cost":  5000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-34",
        "title":  "Dead Space PS5",
        "cost":  14900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-35",
        "title":  "Death Stranding Digital Deluxe Edition",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-36",
        "title":  "Death Stranding 2: On The Beach Digital Deluxe Edition PS5",
        "cost":  36000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-37",
        "title":  "DEATHLOOP Deluxe Edition PS5",
        "cost":  16600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-38",
        "title":  "Demon\u0027s Souls PS5",
        "cost":  12200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-39",
        "title":  "Deus Ex: Mankind Divided",
        "cost":  6300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-40",
        "title":  "Devil May Cry 4 Special Edition",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-41",
        "title":  "Devil May Cry 5 + Vergil",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-42",
        "title":  "Devil May Cry HD Collection",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-43",
        "title":  "Devil May Cry HD Collection \u0026 4SE Bundle",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-44",
        "title":  "DMC4SE Demon Hunter Bundle",
        "cost":  12200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-45",
        "title":  "DmC Devil May Cry: Definitive Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-46",
        "title":  "Digimon Story Time Stranger PS5",
        "cost":  36000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-47",
        "title":  "Dino Crisis",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-48",
        "title":  "DIRT 5",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-49",
        "title":  "DiRT Rally 2.0 Game of the Year Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-50",
        "title":  "Dishonored: Death of the Outsider",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-51",
        "title":  "Dragon Ball FighterZ",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-52",
        "title":  "Dragon Ball Xenoverse: Time Travel Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-53",
        "title":  "Dragon Ball Xenoverse 2",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-54",
        "title":  "Dragon Ball Xenoverse 2 Special Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-55",
        "title":  "Dragon Ball: Sparking! ZERO Edición Legendaria PS5",
        "cost":  80000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-56",
        "title":  "Dying Light Definitive Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-57",
        "title":  "Dying Light 2 Stay Human Reloaded Edition",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-58",
        "title":  "EA Sports PGA Tour PS5",
        "cost":  8400,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-59",
        "title":  "EA Sports WRC 24 PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-60",
        "title":  "EA Star Wars Triple Bundle",
        "cost":  7300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-61",
        "title":  "Ender Magnolia: Bloom in the Mist PS4",
        "cost":  14700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-62",
        "title":  "Ender Magnolia: Bloom in the Mist PS5",
        "cost":  14700,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-63",
        "title":  "Expeditions: A MudRunner Game",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-64",
        "title":  "F1 Manager 2024",
        "cost":  9900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-65",
        "title":  "Fallout 4 Subtitulado",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-66",
        "title":  "Fallout 4: Anniversary Edition",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-67",
        "title":  "Farming Simulator 15",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-68",
        "title":  "Farming Simulator 17",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-69",
        "title":  "Farming Simulator 19",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-70",
        "title":  "Farming Simulator 22",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-71",
        "title":  "Farming Simulator 25 PS5",
        "cost":  27500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-72",
        "title":  "Final Fantasy VII Remake Digital Deluxe Edition PS4",
        "cost":  13600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-73",
        "title":  "Final Fantasy VII Remake Intergrade Digital Deluxe Edition PS5",
        "cost":  15700,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-74",
        "title":  "Final Fantasy VII Rebirth Digital Deluxe Edition PS5",
        "cost":  21300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-75",
        "title":  "Final Fantasy X/X-2 HD Remaster",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-76",
        "title":  "Final Fantasy XVI PS5",
        "cost":  19000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-77",
        "title":  "Forza Horizon 5 Deluxe Edition PS5",
        "cost":  31200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-78",
        "title":  "God of War 2018 Deluxe Edition Español Latino",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-79",
        "title":  "God of War III Remastered",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-80",
        "title":  "God of War Sons of Sparta PS5",
        "cost":  19000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-81",
        "title":  "GORN VR",
        "cost":  8400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-82",
        "title":  "Gotham Knights PS5",
        "cost":  8400,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-83",
        "title":  "Grand Theft Auto: The Trilogy – The Definitive Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-84",
        "title":  "GreedFall Gold Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-85",
        "title":  "Green Hell",
        "cost":  7800,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-86",
        "title":  "GRID Legends",
        "cost":  9400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-87",
        "title":  "Guilty Gear: Strive",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-88",
        "title":  "Hell is Us PS5",
        "cost":  13200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-89",
        "title":  "Hogwarts Legacy PS4 Español Latino",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-90",
        "title":  "Hogwarts Legacy PS5 Español Latino",
        "cost":  11900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-91",
        "title":  "Horizon Zero Dawn: Complete Edition Español Latino",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-92",
        "title":  "Human: Fall Flat",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-93",
        "title":  "Indiana Jones and the Great Circle PS5",
        "cost":  40200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-94",
        "title":  "Injustice 2 Standard Edition Español Latino",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-95",
        "title":  "It Takes Two",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-96",
        "title":  "JoJo\u0027s Bizarre Adventure: All-Star Battle R Deluxe Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-97",
        "title":  "Jurassic World Evolution",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-98",
        "title":  "Jurassic World Evolution: Jurassic Park Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-99",
        "title":  "Jurassic World Evolution 2: Deluxe Edition",
        "cost":  23500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-100",
        "title":  "Jurassic World Evolution 3: Deluxe Edition PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-101",
        "title":  "Just Cause 4 Complete Edition",
        "cost":  14900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-102",
        "title":  "Kingdom Come: Deliverance",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-103",
        "title":  "Kingdom Come: Deliverance II PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-104",
        "title":  "Kingdom Come: Deliverance Saga Bundle PS5",
        "cost":  32000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-105",
        "title":  "Knack 2",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-106",
        "title":  "L.A. Noire",
        "cost":  5400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-107",
        "title":  "LEGO Batman: Legacy of the Dark Knight PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-108",
        "title":  "LEGO Batman: Legacy of the Dark Knight Deluxe Edition PS5",
        "cost":  57500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-109",
        "title":  "LEGO DC Super-Villains Deluxe Edition",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-110",
        "title":  "LEGO Harry Potter Collection PS4",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-111",
        "title":  "LEGO Harry Potter Collection PS5",
        "cost":  7600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-112",
        "title":  "LEGO Jurassic World",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-113",
        "title":  "LEGO Marvel Collection",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-114",
        "title":  "LEGO Marvel\u0027s Avengers",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-115",
        "title":  "LEGO Star Wars: The Skywalker Saga",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-116",
        "title":  "LEGO Star Wars: The Skywalker Saga Galactic Edition",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-117",
        "title":  "LEGO Worlds",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-118",
        "title":  "The LEGO Games Bundle",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-119",
        "title":  "Lies of P",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-120",
        "title":  "Life is Strange Remastered Collection",
        "cost":  4600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-121",
        "title":  "Life is Strange: True Colors",
        "cost":  6600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-122",
        "title":  "Life is Strange: True Colors Deluxe Edition",
        "cost":  7200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-123",
        "title":  "Life is Strange: Double Exposure PS5",
        "cost":  19000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-124",
        "title":  "Life is Strange: Reunion PS5",
        "cost":  27500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-125",
        "title":  "Like a Dragon: Infinite Wealth",
        "cost":  17900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-126",
        "title":  "Like a Dragon: Infinite Wealth Deluxe Edition",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-127",
        "title":  "LIMBO \u0026 INSIDE Bundle",
        "cost":  5300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-128",
        "title":  "Little Nightmares II",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-129",
        "title":  "Mafia: Definitive Edition",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-130",
        "title":  "Mafia: Trilogy",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-131",
        "title":  "Mafia: The Old Country PS5",
        "cost":  27500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-132",
        "title":  "Marvel\u0027s Guardians of the Galaxy",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-133",
        "title":  "Marvel\u0027s Spider-Man: Game of the Year Edition Español Latino",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-134",
        "title":  "Marvel\u0027s Spider-Man Remastered PS5 Español Latino",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-135",
        "title":  "Mass Effect Legendary Edition",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-136",
        "title":  "Mass Effect: Andromeda Standard Recruit Edition",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-137",
        "title":  "Metal Gear Solid Delta: Snake Eater PS5",
        "cost":  32000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-138",
        "title":  "Metaphor: ReFantazio",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-139",
        "title":  "Metro Exodus",
        "cost":  5000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-140",
        "title":  "Metro Saga Bundle",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-141",
        "title":  "Middle-earth: Shadow of War",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-142",
        "title":  "MIO: Memories in Orbit PS5",
        "cost":  14900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-143",
        "title":  "Monster Energy Supercross 6",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-144",
        "title":  "Monster Hunter Rise Deluxe Edition",
        "cost":  14900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-145",
        "title":  "Monster Hunter Rise + Sunbreak Deluxe",
        "cost":  17900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-146",
        "title":  "Monster Hunter World: Iceborne Master Edition Digital Deluxe",
        "cost":  16600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-147",
        "title":  "Mortal Kombat XL Español Latino",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-148",
        "title":  "Mortal Kombat 11 Standard Subtitulado",
        "cost":  4000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-149",
        "title":  "Mortal Kombat 11 Standard Español Latino",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-150",
        "title":  "Mortal Kombat 1 PS5 Español Latino",
        "cost":  11000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-151",
        "title":  "Mortal Kombat: Elder God Bundle PS5 Español Latino",
        "cost":  31200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-152",
        "title":  "MotoGP 25 PS4",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-153",
        "title":  "MotoGP 25 PS5",
        "cost":  11000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-154",
        "title":  "MOUSE: P.I. For Hire PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-155",
        "title":  "MudRunner",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-156",
        "title":  "MXGP 2021 PS4",
        "cost":  5900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-157",
        "title":  "MXGP 2021 PS5",
        "cost":  5900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-158",
        "title":  "My Hero One\u0027s Justice 2 Deluxe Edition",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-159",
        "title":  "Naruto Shippuden: Ultimate Ninja Storm Trilogy",
        "cost":  14900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-160",
        "title":  "Naruto Shippuden: Ultimate Ninja Storm 4 Road to Boruto Español Latino",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-161",
        "title":  "Naruto to Boruto: Shinobi Striker",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-162",
        "title":  "Naruto x Boruto Ultimate Ninja Storm Connections Español Latino",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-163",
        "title":  "Naruto x Boruto Ultimate Ninja Storm Connections Ultimate Edition Español Latino",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-164",
        "title":  "NBA 2K27 PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-165",
        "title":  "Need for Speed",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-166",
        "title":  "Need for Speed Heat Deluxe Edition",
        "cost":  8400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-167",
        "title":  "Need for Speed Hot Pursuit Remastered",
        "cost":  4600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-168",
        "title":  "Need for Speed Payback Deluxe Edition",
        "cost":  9400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-169",
        "title":  "Need for Speed Rivals",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-170",
        "title":  "Need for Speed Unbound PS5",
        "cost":  8400,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-171",
        "title":  "Nickelodeon All-Star Brawl 2",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-172",
        "title":  "Ninja Gaiden: Master Collection",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-173",
        "title":  "Ninja Gaiden 2 Black PS5",
        "cost":  19000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-174",
        "title":  "Nioh",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-175",
        "title":  "One Piece Odyssey",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-176",
        "title":  "One Punch Man: A Hero Nobody Knows Deluxe Edition",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-177",
        "title":  "Onimusha 1+2 Pack",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-178",
        "title":  "Overcooked! All You Can Eat",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-179",
        "title":  "Pacific Drive PS5",
        "cost":  11000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-180",
        "title":  "Palworld PS5",
        "cost":  21300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-181",
        "title":  "Persona 3 Reload",
        "cost":  21300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-182",
        "title":  "Persona 4 Golden",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-183",
        "title":  "PGA Tour 2K25 PS5",
        "cost":  18300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-184",
        "title":  "Phoenix Wright: Ace Attorney Trilogy",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-185",
        "title":  "Plants vs. Zombies: Garden Warfare 2",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-186",
        "title":  "Plants vs. Zombies: Battle for Neighborville Deluxe Edition",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-187",
        "title":  "Plants vs. Zombies: Replanted",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-188",
        "title":  "Police Simulator: Patrol Officers",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-189",
        "title":  "Power Rangers: Battle for the Grid",
        "cost":  5900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-190",
        "title":  "Prey",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-191",
        "title":  "Raccoon City Edition (RE2 + RE3)",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-192",
        "title":  "Ready or Not PS5",
        "cost":  35900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-193",
        "title":  "Red Dead Redemption",
        "cost":  23500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-194",
        "title":  "Red Dead Redemption 2",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-195",
        "title":  "Resident Evil: Deluxe Origins Bundle",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-196",
        "title":  "Resident Evil 2 Deluxe Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-197",
        "title":  "Resident Evil 4 Remake Gold Edition",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-198",
        "title":  "Resident Evil 7 Biohazard Gold Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-199",
        "title":  "Resident Evil Village Gold Edition",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-200",
        "title":  "Resident Evil Triple Pack (RE4 + RE5 + RE6)",
        "cost":  13600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-201",
        "title":  "Resident Evil Requiem Deluxe Edition PS5",
        "cost":  52600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-202",
        "title":  "Returnal PS5",
        "cost":  12200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-203",
        "title":  "RIDE 6 PS5",
        "cost":  34600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-204",
        "title":  "RoboCop: Rogue City PS5",
        "cost":  9300,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-205",
        "title":  "S.T.A.L.K.E.R. 2: Heart of Chornobyl PS5",
        "cost":  40200,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-206",
        "title":  "SAROS PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-207",
        "title":  "Shin Megami Tensei V: Vengeance",
        "cost":  18300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-208",
        "title":  "SHINOBI: Art of Vengeance",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-209",
        "title":  "Sid Meier\u0027s Civilization VI",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-210",
        "title":  "Sid Meier\u0027s Civilization VII",
        "cost":  32000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-211",
        "title":  "Sniper Elite 5",
        "cost":  10100,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-212",
        "title":  "Sniper Elite 5 Complete Edition",
        "cost":  17000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-213",
        "title":  "Sniper Ghost Warrior Contracts",
        "cost":  5900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-214",
        "title":  "Sniper Ghost Warrior Contracts Full Arsenal Edition",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-215",
        "title":  "Sniper Ghost Warrior Contracts 2 Deluxe Arsenal Edition",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-216",
        "title":  "Sniper Ghost Warrior Contracts 2 Complete Edition",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-217",
        "title":  "SnowRunner 1-Year Anniversary Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-218",
        "title":  "Sonic Colours: Ultimate",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-219",
        "title":  "Sonic Forces Digital Standard Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-220",
        "title":  "Sonic Frontiers",
        "cost":  14900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-221",
        "title":  "Sonic Mania",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-222",
        "title":  "Sonic Origins Plus",
        "cost":  13200,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-223",
        "title":  "Sonic X Shadow Generations",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-224",
        "title":  "Soulcalibur VI",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-225",
        "title":  "Split Fiction PS5",
        "cost":  32000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-226",
        "title":  "Star Wars: Squadrons",
        "cost":  3900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-227",
        "title":  "Star Wars Battlefront II: Celebration Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-228",
        "title":  "Star Wars Jedi: Fallen Order",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-229",
        "title":  "Star Wars Jedi: Survivor PS4",
        "cost":  13600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-230",
        "title":  "Star Wars Jedi: Survivor PS5",
        "cost":  11900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-231",
        "title":  "Star Wars Jedi Bundle Edition",
        "cost":  23500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-232",
        "title":  "Star Wars Outlaws PS5",
        "cost":  17900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-233",
        "title":  "Street Fighter 6",
        "cost":  16600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-234",
        "title":  "Stranded Deep",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-235",
        "title":  "Suicide Squad: Kill the Justice League PS5",
        "cost":  7600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-236",
        "title":  "Tails of Iron \u0026 Tails of Iron 2 Deluxe Bundle",
        "cost":  14900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-237",
        "title":  "Tekken 7",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-238",
        "title":  "Tekken 7 Definitive Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-239",
        "title":  "Tekken 8 PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-240",
        "title":  "Tekken 8 Season 2 Ultimate Edition PS5",
        "cost":  57500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-241",
        "title":  "Tennis World Tour Legends Edition",
        "cost":  4600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-242",
        "title":  "Terraria PS4 Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-243",
        "title":  "The Evil Within Digital Bundle",
        "cost":  8900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-244",
        "title":  "The First Berserker: Khazan PS5",
        "cost":  34600,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-245",
        "title":  "The Midnight Walk PS5",
        "cost":  14500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-246",
        "title":  "The Order: 1886",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-247",
        "title":  "The Outer Worlds: Spacer\u0027s Choice Edition",
        "cost":  16600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-248",
        "title":  "The Quarry PS4",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-249",
        "title":  "The Quarry PS5",
        "cost":  8400,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-250",
        "title":  "TIEBREAK Grand Slam Edition",
        "cost":  19000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-251",
        "title":  "Titanfall 2: Ultimate Edition",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-252",
        "title":  "TopSpin 2K25 PS4",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-253",
        "title":  "TopSpin 2K25 PS5",
        "cost":  15700,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-254",
        "title":  "TopSpin 2K25 Edición Grand Slam",
        "cost":  27500,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-255",
        "title":  "UFC 6 PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-256",
        "title":  "Uncharted: The Nathan Drake Collection",
        "cost":  8600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-257",
        "title":  "Uncharted 4 \u0026 The Lost Legacy Digital Bundle Subtitulado/España",
        "cost":  7900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-258",
        "title":  "Uncharted 4 \u0026 The Lost Legacy Digital Bundle Español Latino",
        "cost":  16600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-259",
        "title":  "Undisputed PS5",
        "cost":  19000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-260",
        "title":  "Unravel",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-261",
        "title":  "Unravel Two",
        "cost":  3700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-262",
        "title":  "Until Dawn PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-263",
        "title":  "Until Then",
        "cost":  9300,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-264",
        "title":  "Warhammer 40,000: Space Marine 2 PS5",
        "cost":  17900,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-265",
        "title":  "Wobbly Life",
        "cost":  17900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-266",
        "title":  "Wolfenstein: The New Order",
        "cost":  6700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-267",
        "title":  "Wolfenstein II: The New Colossus",
        "cost":  7600,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-268",
        "title":  "Worms Battlegrounds + Worms W.M.D",
        "cost":  8400,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-269",
        "title":  "WRC 9 Deluxe Edition",
        "cost":  5900,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-270",
        "title":  "WRC Generations Fully Loaded Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-271",
        "title":  "WUCHANG: Fallen Feathers PS5",
        "cost":  32000,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-272",
        "title":  "WWE 2K26 King of Kings Edition PS5",
        "cost":  44500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-273",
        "title":  "WWE 2K26 Attitude Era Edition PS5",
        "cost":  57500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-274",
        "title":  "XCOM 2 Collection",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-275",
        "title":  "Yakuza 0 Director\u0027s Cut PS5",
        "cost":  23500,
        "platform":  "PS5",
        "isLatino":  false
    },
    {
        "id":  "ps-276",
        "title":  "Yakuza Kiwami \u0026 Yakuza Kiwami 2 Bundle",
        "cost":  15700,
        "platform":  "PS4",
        "isLatino":  false
    },
    {
        "id":  "ps-277",
        "title":  "Yakuza: Like a Dragon Hero Edition",
        "cost":  11000,
        "platform":  "PS4",
        "isLatino":  false
    }
],

  // ----------------------------------------------------------------------------
  // 6. BASE DE DATOS SMM CON COSTOS NETOS EXACTOS POR 1.000
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
