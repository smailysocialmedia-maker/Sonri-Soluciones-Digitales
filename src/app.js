/**
 * ==============================================================================
 * SONRI SOLUCIONES DIGITALES — MOTOR DE APLICACIÓN INTERACTIVA & PANEL ADMIN
 * ==============================================================================
 */

// Helper para cálculo y redondeo comercial a múltiplos de 50
function calcSalePrice(costNeto, marginPct = 40) {
  if (!costNeto || isNaN(costNeto)) return 0;
  const raw = Number(costNeto) * (1 + Number(marginPct) / 100);
  return Math.round(raw / 50) * 50;
}

// Estado global de la aplicación
const AppState = {
  config: {},
  cart: [],
  activeCategory: 'all',
  searchQuery: '',
  isAdminLoggedIn: false,
  logoClickCount: 0,
  logoClickTimer: null,
  
  // Estado para el modal de Combos Dinámicos
  comboState: {
    selectedProductIds: ['netflix-premium', 'disney-plus-premium'],
    filterCategory: 'all'
  },

  // Estado para el modal de Crecimiento en Redes (SMM)
  smmState: {
    activeNetwork: 'instagram',
    mode: 'custom', // 'custom' (armá a medida) o 'presets' (paquetes rápidos)
    customQuantities: {}, // serviceId -> number (min 100)
    customEnabled: {}, // serviceId -> boolean
    activeServiceId: 'ig-vistas',
    selectedOptionId: 'ig-vis-5000',
    targetAccountOrLink: ''
  },

  // Estado temporal de selección en tarjetas
  cardVariants: {}
};

// ==============================================================================
// 1. GESTIÓN DE CONFIGURACIÓN & PERSISTENCIA LOCALSTORAGE
// ==============================================================================

function initAppConfig() {
  const baseConfig = window.CATALOG_CONFIG || {};
  try {
    const savedCustom = localStorage.getItem('sonri_custom_config');
    if (savedCustom) {
      const parsed = JSON.parse(savedCustom);
      if (parsed && parsed.products && parsed.products.length > 0) {
        AppState.config = parsed;
      } else {
        AppState.config = JSON.parse(JSON.stringify(baseConfig));
      }
    } else {
      AppState.config = JSON.parse(JSON.stringify(baseConfig));
    }
  } catch (e) {
    AppState.config = JSON.parse(JSON.stringify(baseConfig));
  }

  // Respaldo de seguridad para asegurar catálogo siempre poblado
  if (!AppState.config.products || AppState.config.products.length === 0) {
    AppState.config.products = (baseConfig.products || []).slice();
  }
  if (!AppState.config.categories || AppState.config.categories.length === 0) {
    AppState.config.categories = (baseConfig.categories || []).slice();
  }
  if (!AppState.config.smmData) {
    AppState.config.smmData = baseConfig.smmData || {};
  }
  if (!AppState.config.comboPlatforms) {
    AppState.config.comboPlatforms = baseConfig.comboPlatforms || [];
  }

  syncContactElements();
}

let supabaseClient = null;

function initSupabaseClient() {
  const url = AppState.config.supabaseUrl || (window.CATALOG_CONFIG && window.CATALOG_CONFIG.supabaseUrl);
  const key = AppState.config.supabaseAnonKey || (window.CATALOG_CONFIG && window.CATALOG_CONFIG.supabaseAnonKey);
  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
    } catch (e) {
      console.warn('Error inicializando cliente de Supabase:', e);
    }
  }
}

async function fetchCloudConfig() {
  if (!supabaseClient) {
    updateCloudStatusBadge('local');
    return;
  }

  updateCloudStatusBadge('syncing');
  try {
    const { data, error } = await supabaseClient
      .from('app_config')
      .select('data')
      .eq('id', 'active_catalog')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch error:', error);
      updateCloudStatusBadge('error');
      return;
    }

    if (data && data.data) {
      const cloudConfig = data.data;
      if (cloudConfig.products && cloudConfig.products.length > 0) {
        AppState.config = cloudConfig;
        localStorage.setItem('sonri_custom_config', JSON.stringify(cloudConfig));
        syncContactElements();
        renderCategories();
        renderProducts();
        if (AppState.isAdminLoggedIn) {
          renderAdminProductsTable();
          renderAdminSmmTable();
        }
        updateCloudStatusBadge('connected');
        return;
      }
    }

    // Si la tabla está creada pero vacía, subimos la configuración actual como inicial
    updateCloudStatusBadge('connected');
    saveConfigToCloud(false);
  } catch (err) {
    console.warn('Excepción al conectar con Supabase:', err);
    updateCloudStatusBadge('error');
  }
}

let cloudSaveTimer = null;
function saveConfigToCloud(notify = true) {
  if (!supabaseClient) return;

  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(async () => {
    updateCloudStatusBadge('saving');
    try {
      const payload = {
        id: 'active_catalog',
        data: AppState.config,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabaseClient
        .from('app_config')
        .upsert(payload);

      if (error) {
        console.error('Error al guardar en Supabase:', error);
        updateCloudStatusBadge('error');
      } else {
        updateCloudStatusBadge('connected');
        if (notify) {
          showToast('☁️ ¡Guardado en la nube! Se actualizó para todos los celulares y PC.');
        }
      }
    } catch (err) {
      console.error('Error guardando en la nube:', err);
      updateCloudStatusBadge('error');
    }
  }, 400);
}

function updateCloudStatusBadge(status) {
  const badge = document.getElementById('adminCloudBadge');
  const text = document.getElementById('adminCloudBadgeText');
  if (!badge || !text) return;

  if (status === 'connected') {
    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
    text.textContent = 'Nube Activa (Sincronizado) ☁️';
  } else if (status === 'saving') {
    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1';
    text.textContent = 'Guardando en la nube... ⏳';
  } else if (status === 'syncing') {
    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1';
    text.textContent = 'Conectando a la nube... 🔄';
  } else if (status === 'error') {
    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1';
    text.textContent = 'Modo Local (Nube pendiente de SQL) ⚠️';
  } else {
    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700/40 text-slate-400 border border-slate-700 flex items-center gap-1';
    text.textContent = 'Modo Local 💻';
  }
}

function saveConfigToStorage() {
  try {
    localStorage.setItem('sonri_custom_config', JSON.stringify(AppState.config));
  } catch (e) {
    console.warn('Error al guardar configuración', e);
  }
  saveConfigToCloud(true);
}

function resetToFactoryConfig() {
  if (confirm('¿Estás seguro de que deseas restaurar los costos y márgenes de fábrica? Se borrarán las personalizaciones locales.')) {
    localStorage.removeItem('sonri_custom_config');
    AppState.config = JSON.parse(JSON.stringify(window.CATALOG_CONFIG || {}));
    syncContactElements();
    renderCategories();
    renderProducts();
    renderAdminProductsTable();
    renderAdminSmmTable();
    showToast('Costos de proveedor restaurados');
  }
}

function syncContactElements() {
  const c = AppState.config;
  const waNum = c.whatsappNumber || '5492634377019';
  const waFormatted = c.whatsappFormatted || '+54 9 263 437-7019';
  const igUser = c.instagramUser || '@sonrisas182';
  const igUrl = c.instagramUrl || 'https://instagram.com/sonrisas182';

  const headerWa = document.getElementById('headerWaNumber');
  const headerWaLink = document.getElementById('headerWaLink');
  const headerIg = document.getElementById('headerIgUser');
  const headerIgLink = document.getElementById('headerIgLink');
  const footerWaLink = document.getElementById('footerWaLink');
  const footerIgLink = document.getElementById('footerIgLink');
  const floatingWa = document.getElementById('floatingWhatsAppLink');

  if (headerWa) headerWa.textContent = waFormatted;
  if (headerWaLink) headerWaLink.href = `https://wa.me/${waNum}`;
  if (headerIg) headerIg.textContent = igUser;
  if (headerIgLink) headerIgLink.href = igUrl;
  if (footerWaLink) {
    footerWaLink.textContent = waFormatted;
    footerWaLink.href = `https://wa.me/${waNum}`;
  }
  if (footerIgLink) {
    footerIgLink.textContent = igUser;
    footerIgLink.href = igUrl;
  }
  if (floatingWa) {
    const defaultMsg = `¡Hola ${c.brandName || 'Sonri Soluciones Digitales'}! Quiero hacerles una consulta sobre sus servicios.`;
    floatingWa.href = `https://wa.me/${waNum}?text=${encodeURIComponent(defaultMsg)}`;
  }
}

// ==============================================================================
// 2. DISPARADORES SECRETOS DE ACCESO ADMINISTRADOR
// ==============================================================================

function handleLogoSecretClick() {
  AppState.logoClickCount++;
  clearTimeout(AppState.logoClickTimer);

  if (AppState.logoClickCount >= 3) {
    AppState.logoClickCount = 0;
    openAdminLoginModal();
    return;
  }

  AppState.logoClickTimer = setTimeout(() => {
    AppState.logoClickCount = 0;
  }, 1200);
}

function checkUrlHashForAdmin() {
  if (window.location.hash === '#admin') {
    openAdminLoginModal();
  }
}

// ==============================================================================
// 3. UTILIDADES DE FORMATEO Y TOAST
// ==============================================================================

function formatCurrency(amount) {
  if (!AppState.config.showPrices) {
    return 'Consultar cotización';
  }
  return `${AppState.config.currencySymbol || '$'}${Number(amount).toLocaleString('es-AR')}`;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item glass-panel-deep px-5 py-3 rounded-xl border border-cyan-500/40 text-sm font-semibold flex items-center gap-3 shadow-2xl neon-glow-cyan text-white`;
  
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==============================================================================
// 4. RENDERIZADO DEL CATÁLOGO PÚBLICO
// ==============================================================================

function renderCategories() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  const cats = [
    { id: 'all', shortName: 'Todos los Servicios', icon: 'Sparkles' },
    ...(AppState.config.categories || [])
  ];

  container.innerHTML = cats.map(cat => {
    const isActive = AppState.activeCategory === cat.id;
    return `
      <button 
        onclick="setActiveCategory('${cat.id}')"
        class="category-pill px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg neon-glow-cyan' 
            : 'bg-[#0B0C14] text-slate-300 hover:text-white border border-[#1E2238] hover:border-cyan-500/50'
        }"
      >
        <span>${getIconSvg(cat.icon || 'Sparkles', 'w-4 h-4')}</span>
        <span>${cat.shortName}</span>
      </button>
    `;
  }).join('');
}

function setActiveCategory(catId) {
  AppState.activeCategory = catId;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  const countEl = document.getElementById('productCountBadge');
  if (!container) return;

  let products = AppState.config.products || [];

  if (AppState.activeCategory !== 'all') {
    products = products.filter(p => p.category === AppState.activeCategory);
  }

  if (AppState.searchQuery.trim() !== '') {
    const q = AppState.searchQuery.toLowerCase();
    products = products.filter(p => {
      const nameMatch = (p.name || '').toLowerCase().includes(q);
      const descMatch = (p.description || '').toLowerCase().includes(q);
      const catMatch = (p.category || '').toLowerCase().includes(q);
      const benefitMatch = (p.benefits || []).some(b => b.toLowerCase().includes(q));
      return nameMatch || descMatch || catMatch || benefitMatch;
    });
  }

  if (countEl) {
    countEl.textContent = `${products.length} servicios disponibles`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl border border-dashed border-[#1E2238]">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-900 flex items-center justify-center text-cyan-400">
          ${getIconSvg('Search', 'w-8 h-8')}
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No se encontraron servicios</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">
          No encontramos resultados para "${AppState.searchQuery}". Probá buscando por otra palabra clave.
        </p>
        <button onclick="clearSearch()" class="px-5 py-2.5 rounded-xl bg-[#121424] text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 text-sm font-semibold transition">
          Ver todos los servicios
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => createProductCardHtml(product)).join('');
}

function createProductCardHtml(product) {
  if (!AppState.cardVariants[product.id]) {
    AppState.cardVariants[product.id] = {
      carrier: (product.carriers && product.carriers[0]) || '',
      appOption: (product.appOptions && product.appOptions[0]) || ''
    };
  }

  const currentSelection = AppState.cardVariants[product.id];
  let currentPrice = product.price;

  // Si es Internet Móvil con precios por operador
  if (product.hasCarrierSelector && product.carrierPricing && currentSelection.carrier) {
    const cp = product.carrierPricing[currentSelection.carrier];
    if (cp && cp.price) currentPrice = cp.price;
  }

  const isCombo = product.isSpecialCombo;
  const isSMM = product.isSpecialSMM;

  return `
    <div class="group relative rounded-2xl p-6 glass-panel neon-border-hover flex flex-col justify-between transition-all duration-300">
      
      <div class="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:from-cyan-500/20 group-hover:to-purple-600/20 transition-all"></div>

      <div>
        <div class="flex items-start justify-between gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-[#121424] border border-[#1E2238] flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-500/60 transition-all shadow-md">
            ${getIconSvg(product.icon || 'Sparkles', 'w-6 h-6')}
          </div>
          <span class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#121424] text-cyan-300 border border-cyan-500/30">
            ${product.badge || 'Disponible'}
          </span>
        </div>

        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          ${product.name}
        </h3>

        <p class="text-xs text-slate-400 mb-5 leading-relaxed">
          ${product.description}
        </p>

        <!-- Selector de Operador para Internet Móvil -->
        ${product.hasCarrierSelector ? `
          <div class="mb-4">
            <label class="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Línea Celular:
            </label>
            <div class="grid grid-cols-2 gap-2">
              ${(product.carriers || ['Personal', 'Claro']).map(c => `
                <button 
                  type="button"
                  onclick="selectCardCarrier('${product.id}', '${c}')"
                  class="px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    currentSelection.carrier === c 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                      : 'bg-[#121424] border-[#1E2238] text-slate-400 hover:text-white'
                  }"
                >
                  ${c}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Selector de Aplicación IPTV -->
        ${product.hasAppSelector ? `
          <div class="mb-4">
            <label class="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Aplicación Preferida:
            </label>
            <div class="grid grid-cols-2 gap-2">
              ${(product.appOptions || []).map(app => `
                <button 
                  type="button"
                  onclick="selectCardApp('${product.id}', '${app}')"
                  class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all truncate ${
                    currentSelection.appOption === app 
                      ? 'bg-purple-600/25 border-purple-400 text-purple-300' 
                      : 'bg-[#121424] border-[#1E2238] text-slate-400 hover:text-white'
                  }"
                >
                  ${app}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="space-y-2 mb-6">
          ${(product.benefits || []).map(b => `
            <div class="flex items-start gap-2.5 text-xs text-slate-300">
              <span class="text-cyan-400 mt-0.5 shrink-0">
                ${getIconSvg('CheckCircle2', 'w-3.5 h-3.5 check-cyan')}
              </span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-[#1E2238]">
        <div class="flex items-baseline justify-between mb-4">
          <div>
            <span class="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              ${AppState.config.showPrices ? 'Precio Final' : 'Modalidad'}
            </span>
            <span class="text-xl md:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
              ${formatCurrency(currentPrice)}
            </span>
          </div>
          <span class="text-xs text-slate-400">
            ${product.period ? `/${product.period}` : ''}
          </span>
        </div>

        ${isCombo ? `
          <button 
            type="button" 
            onclick="openComboModal()" 
            class="w-full py-3 px-4 rounded-xl gradient-btn-neon text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <span>${getIconSvg('Sliders', 'w-4 h-4')}</span>
            <span>Personalizar Mi Combo</span>
          </button>
        ` : isSMM ? `
          <button 
            type="button" 
            onclick="openSmmModal()" 
            class="w-full py-3 px-4 rounded-xl gradient-btn-neon text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <span>${getIconSvg('Zap', 'w-4 h-4')}</span>
            <span>Configurar Paquete SMM</span>
          </button>
        ` : `
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onclick="addCardProductToCart('${product.id}')" 
              class="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-md"
            >
              <span>${getIconSvg('PlusCircle', 'w-4 h-4')}</span>
              <span>Al Pedido</span>
            </button>

            <button 
              type="button" 
              onclick="consultProductDirectly('${product.id}')" 
              class="py-2.5 px-3 rounded-xl bg-[#121424] hover:bg-[#1A1D34] text-slate-300 hover:text-white border border-[#1E2238] font-semibold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>${getIconSvg('MessageSquare', 'w-4 h-4')}</span>
              <span>Consultar</span>
            </button>
          </div>
        `}
      </div>

    </div>
  `;
}

function selectCardCarrier(productId, carrier) {
  if (!AppState.cardVariants[productId]) AppState.cardVariants[productId] = {};
  AppState.cardVariants[productId].carrier = carrier;
  renderProducts();
}

function selectCardApp(productId, appOption) {
  if (!AppState.cardVariants[productId]) AppState.cardVariants[productId] = {};
  AppState.cardVariants[productId].appOption = appOption;
  renderProducts();
}

function addCardProductToCart(productId) {
  const product = (AppState.config.products || []).find(p => p.id === productId);
  if (!product) return;

  const currentSelection = AppState.cardVariants[productId] || {};
  let finalPrice = product.price;
  let variantDetails = product.period || '30 días';

  if (product.hasCarrierSelector && currentSelection.carrier) {
    variantDetails = `Línea ${currentSelection.carrier} • ${variantDetails}`;
    if (product.carrierPricing && product.carrierPricing[currentSelection.carrier]) {
      finalPrice = product.carrierPricing[currentSelection.carrier].price;
    }
  }

  if (product.hasAppSelector && currentSelection.appOption) {
    variantDetails = `App ${currentSelection.appOption} • ${variantDetails}`;
  }

  addToCart({
    productId: product.id,
    name: product.name,
    variantName: variantDetails,
    price: finalPrice,
    quantity: 1
  });

  showToast(`¡${product.name} agregado al pedido!`);
}

function consultProductDirectly(productId) {
  const product = (AppState.config.products || []).find(p => p.id === productId);
  if (!product) return;

  const currentSelection = AppState.cardVariants[productId] || {};
  let finalPrice = product.price;
  let details = product.period || '30 días';

  if (product.hasCarrierSelector && currentSelection.carrier) {
    details += ` (Línea: ${currentSelection.carrier})`;
    if (product.carrierPricing && product.carrierPricing[currentSelection.carrier]) {
      finalPrice = product.carrierPricing[currentSelection.carrier].price;
    }
  }
  if (product.hasAppSelector && currentSelection.appOption) {
    details += ` (App: ${currentSelection.appOption})`;
  }

  const priceStr = AppState.config.showPrices ? `Precio: ${formatCurrency(finalPrice)}` : 'A convenir';
  const message = `¡Hola *${AppState.config.brandName || 'Sonri Soluciones Digitales'}*! Quiero consultar por el servicio: *${product.name}* [${details}] (${priceStr}). ¿Tienen disponibilidad de entrega?`;
  
  const waNum = AppState.config.whatsappNumber || '5492634377019';
  const url = `https://wa.me/${waNum}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==============================================================================
// 5. CARRITO DE COMPRAS Y CHECKOUT WHATSAPP
// ==============================================================================

function addToCart(item) {
  const existingIndex = AppState.cart.findIndex(i => 
    i.productId === item.productId && i.variantName === item.variantName
  );

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += item.quantity || 1;
  } else {
    AppState.cart.push({
      id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      productId: item.productId,
      name: item.name,
      variantName: item.variantName,
      price: item.price,
      quantity: item.quantity || 1
    });
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartQuantity(cartItemId, delta) {
  const item = AppState.cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== cartItemId);
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(cartItemId) {
  AppState.cart = AppState.cart.filter(i => i.id !== cartItemId);
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast('Carrito vaciado');
}

function updateCartBadge() {
  const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge-counter');
  
  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) {
      b.classList.remove('hidden');
      b.classList.add('flex');
    } else {
      b.classList.add('hidden');
      b.classList.remove('flex');
    }
  });
}

function saveCartToStorage() {
  try {
    localStorage.setItem('sonri_cart', JSON.stringify(AppState.cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('sonri_cart');
    if (saved) AppState.cart = JSON.parse(saved);
  } catch (e) {
    AppState.cart = [];
  }
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    renderCartDrawer();
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.style.transform = 'translateX(0)';
    }, 10);
  } else {
    drawer.style.transform = 'translateX(100%)';
    backdrop.classList.add('opacity-0');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
  }
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById('cartItemsList');
  const totalAmountEl = document.getElementById('cartTotalAmount');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  const emptyStateEl = document.getElementById('cartEmptyState');
  const cartBodyEl = document.getElementById('cartBody');

  if (!itemsContainer) return;

  const totalPrice = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  if (AppState.cart.length === 0) {
    if (emptyStateEl) emptyStateEl.classList.remove('hidden');
    if (cartBodyEl) cartBodyEl.classList.add('hidden');
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    return;
  }

  if (emptyStateEl) emptyStateEl.classList.add('hidden');
  if (cartBodyEl) cartBodyEl.classList.remove('hidden');
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  itemsContainer.innerHTML = AppState.cart.map(item => {
    return `
      <div class="p-3.5 rounded-xl bg-[#121424] border border-[#1E2238] flex items-center justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white truncate">${item.name}</h4>
          <p class="text-xs text-cyan-300 truncate">${item.variantName}</p>
          ${AppState.config.showPrices ? `
            <p class="text-xs font-semibold text-slate-400 mt-0.5">${formatCurrency(item.price)} c/u</p>
          ` : ''}
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center bg-[#0B0C14] border border-[#1E2238] rounded-lg p-0.5">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-slate-800 text-xs font-bold">-</button>
            <span class="w-6 text-center text-xs font-bold text-white">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-cyan-400 hover:text-white rounded hover:bg-slate-800 text-xs font-bold">+</button>
          </div>
          <button onclick="removeCartItem('${item.id}')" class="text-slate-500 hover:text-red-400 p-1.5 rounded transition">
            ${getIconSvg('Trash2', 'w-4 h-4')}
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (totalAmountEl) {
    totalAmountEl.textContent = formatCurrency(totalPrice);
  }
}

function copyAliasToClipboard() {
  const alias = 'sonridigital';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(alias).then(() => {
      const btnText = document.getElementById('copyAliasBtnText');
      if (btnText) {
        btnText.textContent = '¡Copiado!';
        setTimeout(() => { btnText.textContent = 'Copiar'; }, 2000);
      }
      showToast('¡Alias "sonridigital" copiado al portapapeles!');
    }).catch(() => {
      prompt('Copiá el Alias para transferir:', alias);
    });
  } else {
    prompt('Copiá el Alias para transferir:', alias);
  }
}

function sendWhatsAppOrder() {
  if (AppState.cart.length === 0) {
    showToast('El carrito está vacío', 'warning');
    return;
  }

  const activationInput = document.getElementById('cartActivationData');
  const notesInput = document.getElementById('cartCustomerNotes');

  const activationData = activationInput ? activationInput.value.trim() : '';
  const customNotes = notesInput ? notesInput.value.trim() : '';

  const totalPrice = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalFormatted = formatCurrency(totalPrice);

  const hasSMM = AppState.cart.some(i => (i.productId && i.productId.includes('smm')) || (i.name && (i.name.toLowerCase().includes('seguidor') || i.name.toLowerCase().includes('vista') || i.name.toLowerCase().includes('like') || i.name.toLowerCase().includes('redes'))));
  const hasEmailService = AppState.cart.some(i => i.name && (i.name.toLowerCase().includes('gemini') || i.name.toLowerCase().includes('canva') || i.name.toLowerCase().includes('chatgpt') || i.name.toLowerCase().includes('google')));
  const hasStandardAccount = AppState.cart.some(i => !hasSMM && !(i.name && i.name.toLowerCase().includes('gemini')));

  const itemsText = AppState.cart.map(item => {
    return `- ${item.quantity}x *${item.name}* [${item.variantName}] - ${formatCurrency(item.price * item.quantity)}`;
  }).join('\n');

  let message = `¡Hola *${AppState.config.brandName || 'Sonri Soluciones Digitales'}*! Ya realicé la transferencia para encargar el siguiente pedido:\n\n${itemsText}\n\n`;

  message += `*TOTAL TRANSFERIDO:* ${totalFormatted}\n`;
  message += `*TRANSFERIDO A:* sonridigital\n`;
  message += `*TITULAR:* Jonathan Emanuel Perez\n\n`;

  if (activationData) {
    if (hasEmailService && !hasSMM) {
      message += `*Correo para activar:* ${activationData}\n`;
    } else if (hasSMM && !hasEmailService) {
      message += `*Link o usuario:* ${activationData}\n`;
    } else {
      message += `*Dato de activación (Correo/Link):* ${activationData}\n`;
    }
  }

  if (customNotes) {
    message += `*Nota:* ${customNotes}\n`;
  }

  message += `\n*Te adjunto la captura del comprobante por acá.*\n`;

  if (hasEmailService && !hasStandardAccount && !hasSMM) {
    message += `Quedo a la espera de la activación en mi correo. ¡Muchas gracias!`;
  } else if (hasSMM && !hasStandardAccount && !hasEmailService) {
    message += `Quedo a la espera de la entrega en el link indicado. ¡Muchas gracias!`;
  } else {
    message += `Quedo a la espera de los datos de acceso (usuario y clave). ¡Muchas gracias!`;
  }

  const waNum = AppState.config.whatsappNumber || '5492634377019';
  const url = `https://wa.me/${waNum}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==============================================================================
// ==============================================================================
// 6. MODAL INTERACTIVO: CONSTRUCTOR DINÁMICO DE COMBOS (STREAMING, IA & IPTV)
// ==============================================================================

function openComboModal() {
  const modal = document.getElementById('comboModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderComboModalContent();
}

function closeComboModal() {
  const modal = document.getElementById('comboModal');
  if (modal) modal.classList.add('hidden');
}

function setComboCategoryFilter(catId) {
  AppState.comboState.filterCategory = catId;
  renderComboModalContent();
}

function toggleComboProduct(productId) {
  const idx = AppState.comboState.selectedProductIds.indexOf(productId);
  if (idx > -1) {
    AppState.comboState.selectedProductIds.splice(idx, 1);
  } else {
    AppState.comboState.selectedProductIds.push(productId);
  }
  renderComboModalContent();
}

function calculateComboPricing() {
  const allProds = AppState.config.products || [];
  const selectedProducts = allProds.filter(p => AppState.comboState.selectedProductIds.includes(p.id));
  
  const regularSubtotal = selectedProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  const count = selectedProducts.length;

  // Escala de descuentos por volumen de combo:
  // 2 cuentas: 15% OFF | 3 cuentas: 20% OFF | 4+ cuentas: 25% OFF
  let discountPct = 0;
  if (count === 2) discountPct = 15;
  else if (count === 3) discountPct = 20;
  else if (count >= 4) discountPct = 25;

  let finalPrice = regularSubtotal;
  let totalSavings = 0;

  if (count >= 2 && regularSubtotal > 0) {
    const rawDiscounted = regularSubtotal * (1 - discountPct / 100);
    finalPrice = Math.round(rawDiscounted / 50) * 50;
    totalSavings = regularSubtotal - finalPrice;
  }

  return {
    selectedProducts,
    count,
    regularSubtotal,
    discountPct,
    finalPrice,
    totalSavings
  };
}

function renderComboModalContent() {
  const catFilterContainer = document.getElementById('comboCategoryFilterTabs');
  const productsGrid = document.getElementById('comboProductsGrid');
  const pricingCard = document.getElementById('comboPricingCard');
  const addBtn = document.getElementById('comboAddToCartBtn');

  if (!catFilterContainer || !productsGrid || !pricingCard) return;

  // 1. Pestañas de categorías disponibles para combo
  const comboCats = [
    { id: 'all', label: 'Todos los Servicios' },
    { id: 'streaming', label: 'Streaming & Cine' },
    { id: 'creadores-ia', label: 'Herramientas & IA' },
    { id: 'iptv', label: 'Televisión & IPTV' }
  ];

  catFilterContainer.innerHTML = comboCats.map(cat => {
    const isActive = AppState.comboState.filterCategory === cat.id;
    return `
      <button 
        type="button"
        onclick="setComboCategoryFilter('${cat.id}')"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
          isActive 
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm' 
            : 'bg-[#121424] text-slate-400 hover:text-white border border-[#1E2238]'
        }"
      >
        ${cat.label}
      </button>
    `;
  }).join('');

  // 2. Filtrar productos aptos para combo (excluyendo tarjetas comodín especiales)
  let eligibleProducts = (AppState.config.products || []).filter(p => !p.isSpecialCombo && !p.isSpecialSMM);

  if (AppState.comboState.filterCategory !== 'all') {
    eligibleProducts = eligibleProducts.filter(p => p.category === AppState.comboState.filterCategory);
  }

  // 3. Renderizar grilla de productos seleccionables
  productsGrid.innerHTML = eligibleProducts.map(p => {
    const isSelected = AppState.comboState.selectedProductIds.includes(p.id);
    return `
      <div 
        onclick="toggleComboProduct('${p.id}')"
        class="p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all select-none ${
          isSelected 
            ? 'bg-cyan-500/15 border-cyan-400/80 shadow-md neon-glow-cyan' 
            : 'bg-[#08090F] border-[#1E2238] hover:border-slate-600'
        }"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg ${isSelected ? 'bg-cyan-400 text-black' : 'bg-[#121424] text-cyan-400'} flex items-center justify-center font-bold text-xs shrink-0">
            ${isSelected ? '✓' : getIconSvg(p.icon || 'Film', 'w-4 h-4')}
          </div>
          <div class="min-w-0">
            <h4 class="text-xs font-bold text-white truncate ${isSelected ? 'text-cyan-200' : ''}">${p.name}</h4>
            <p class="text-[10px] text-slate-400 truncate">${p.period || '30 días'}</p>
          </div>
        </div>

        <div class="text-right shrink-0">
          <span class="text-xs font-black text-white ${isSelected ? 'text-cyan-300' : ''}">
            ${formatCurrency(p.price)}
          </span>
          <span class="block text-[9px] uppercase font-bold text-slate-500">Precio individual</span>
        </div>
      </div>
    `;
  }).join('');

  // 4. Calcular precios dinámicos y descuentos
  const pricing = calculateComboPricing();

  if (pricing.count < 2) {
    pricingCard.innerHTML = `
      <div>
        <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
          <span>⚠️</span>
          <span>Seleccioná al menos 2 servicios</span>
        </span>
        <span class="text-[11px] text-slate-400 block mt-0.5">
          Actualmente tenés ${pricing.count} servicio(s) marcado(s). Sumá otro para activar el 15% de descuento.
        </span>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-slate-500 block uppercase font-bold">Subtotal actual:</span>
        <span class="text-base font-black text-slate-400">${formatCurrency(pricing.regularSubtotal)}</span>
      </div>
    `;

    if (addBtn) {
      addBtn.disabled = true;
      addBtn.className = 'w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-500 bg-[#121424] border border-[#1E2238] cursor-not-allowed transition-all';
      addBtn.textContent = 'Elegí al menos 2 servicios para armar tu combo';
    }
  } else {
    pricingCard.innerHTML = `
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <span>🔥</span>
            <span>Combo Pack (${pricing.count} servicios)</span>
          </span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
            ${pricing.discountPct}% OFF APLICADO
          </span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-500 line-through">${formatCurrency(pricing.regularSubtotal)}</span>
          <span class="text-emerald-400 font-bold">¡Ahorrás ${formatCurrency(pricing.totalSavings)}!</span>
        </div>
      </div>

      <div class="text-right">
        <span class="text-[10px] text-cyan-400 block uppercase font-bold tracking-wider">Precio Final Combo:</span>
        <span class="text-2xl font-black text-white">${formatCurrency(pricing.finalPrice)}</span>
      </div>
    `;

    if (addBtn) {
      addBtn.disabled = false;
      addBtn.className = 'w-full py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white gradient-btn-neon shadow-xl cursor-pointer transition-all hover:scale-[1.01]';
      addBtn.textContent = `Agregar Combo al Pedido (${formatCurrency(pricing.finalPrice)}) 🛒`;
    }
  }
}

function submitCustomComboToCart() {
  const pricing = calculateComboPricing();
  if (pricing.count < 2) {
    showToast('Seleccioná al menos 2 servicios para armar tu combo', 'warning');
    return;
  }

  const names = pricing.selectedProducts.map(p => p.name).join(' + ');

  addToCart({
    productId: 'combo-personalizado',
    name: `Combo Pack (${pricing.count} Servicios)`,
    variantName: `${names} · Descuento ${pricing.discountPct}% OFF`,
    price: pricing.finalPrice,
    quantity: 1
  });

  closeComboModal();
  showToast(`¡Combo de ${pricing.count} servicios agregado al pedido!`);
}

// ==============================================================================
// 7. MODAL INTERACTIVO: CONFIGURADOR SMM A MEDIDA Y PRESETS
// ==============================================================================

function openSmmModal() {
  const modal = document.getElementById('smmModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  initSmmDefaultsIfNeeded();
  renderSmmModalContent();
}

function closeSmmModal() {
  const modal = document.getElementById('smmModal');
  if (modal) modal.classList.add('hidden');
}

function setSmmMode(mode) {
  AppState.smmState.mode = mode;
  renderSmmModalContent();
}

function setSmmNetwork(netKey) {
  AppState.smmState.activeNetwork = netKey;
  initSmmDefaultsIfNeeded();
  renderSmmModalContent();
}

function initSmmDefaultsIfNeeded() {
  const netKey = AppState.smmState.activeNetwork || 'instagram';
  const netData = AppState.config.smmData && AppState.config.smmData[netKey];
  if (!netData || !netData.services) return;

  netData.services.forEach((s, idx) => {
    if (AppState.smmState.customEnabled[s.id] === undefined) {
      AppState.smmState.customEnabled[s.id] = (idx === 0);
    }
    if (!AppState.smmState.customQuantities[s.id]) {
      const isComment = s.id.includes('comentario');
      AppState.smmState.customQuantities[s.id] = isComment ? 25 : 200;
    }
  });

  if (!AppState.smmState.activeServiceId && netData.services[0]) {
    AppState.smmState.activeServiceId = netData.services[0].id;
  }
}

function getSmmServiceMinAndStep(serviceId) {
  if (serviceId.includes('comentario')) {
    return { min: 10, step: 10, default: 25 };
  }
  return { min: 100, step: 100, default: 200 };
}

function toggleSmmCustomItem(serviceId) {
  AppState.smmState.customEnabled[serviceId] = !AppState.smmState.customEnabled[serviceId];
  renderSmmModalContent();
}

function updateSmmCustomQty(serviceId, deltaOrValue) {
  const { min, step } = getSmmServiceMinAndStep(serviceId);
  let current = Number(AppState.smmState.customQuantities[serviceId]) || min;

  if (typeof deltaOrValue === 'number' && (deltaOrValue === step || deltaOrValue === -step)) {
    current += deltaOrValue;
  } else {
    current = Number(deltaOrValue) || min;
  }

  if (current < min) current = min;
  AppState.smmState.customQuantities[serviceId] = current;
  AppState.smmState.customEnabled[serviceId] = true;
  renderSmmModalContent();
}

function calculateSmmCustomPricing() {
  const netKey = AppState.smmState.activeNetwork || 'instagram';
  const netData = (AppState.config.smmData && AppState.config.smmData[netKey]) || { services: [] };

  const enabledItems = [];
  let totalCost = 0;
  let regularSubtotal = 0;
  let totalUnits = 0;

  (netData.services || []).forEach(service => {
    if (AppState.smmState.customEnabled[service.id]) {
      const qty = AppState.smmState.customQuantities[service.id] || getSmmServiceMinAndStep(service.id).min;
      const costPer1000 = service.costPer1000 || 1000;
      const margin = service.margin !== undefined ? service.margin : 50;

      const itemCost = (costPer1000 / 1000) * qty;
      const itemPrice = calcSalePrice(itemCost, margin);

      totalCost += itemCost;
      regularSubtotal += itemPrice;
      totalUnits += qty;

      enabledItems.push({
        service,
        qty,
        itemCost,
        itemPrice
      });
    }
  });

  const count = enabledItems.length;

  // Descuento progresivo por armar pack personalizado de redes:
  let discountPct = 0;
  if (count === 2) discountPct = 10;
  else if (count >= 3) discountPct = 15;

  if (totalUnits >= 1500) discountPct += 5;

  let finalPrice = regularSubtotal;
  let totalSavings = 0;

  if (count > 0 && regularSubtotal > 0) {
    const rawDiscounted = regularSubtotal * (1 - discountPct / 100);
    const candidatePrice = Math.round(rawDiscounted / 50) * 50;

    // PISO DE SEGURIDAD ABSOLUTO (CERO PÉRDIDA GARANTIZADA):
    const safetyFloor = Math.round((totalCost * 1.30) / 50) * 50;

    finalPrice = Math.max(candidatePrice, safetyFloor);
    totalSavings = Math.max(0, regularSubtotal - finalPrice);
  }

  return {
    netData,
    enabledItems,
    count,
    totalUnits,
    regularSubtotal,
    discountPct,
    finalPrice,
    totalSavings
  };
}

function renderSmmModalContent() {
  const mode = AppState.smmState.mode || 'custom';
  const customBtn = document.getElementById('smmModeBtn-custom');
  const presetsBtn = document.getElementById('smmModeBtn-presets');
  const customView = document.getElementById('smmCustomPackView');
  const presetsView = document.getElementById('smmPresetsView');
  const networkTabs = document.getElementById('smmNetworkTabs');

  if (!customBtn || !presetsBtn || !customView || !presetsView || !networkTabs) return;

  if (mode === 'custom') {
    customBtn.className = 'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center bg-purple-600/25 border-purple-400 text-purple-200 shadow-sm cursor-pointer';
    presetsBtn.className = 'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center bg-[#121424] border-[#1E2238] text-slate-400 hover:text-white cursor-pointer';
    customView.classList.remove('hidden');
    presetsView.classList.add('hidden');
  } else {
    presetsBtn.className = 'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center bg-purple-600/25 border-purple-400 text-purple-200 shadow-sm cursor-pointer';
    customBtn.className = 'py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center bg-[#121424] border-[#1E2238] text-slate-400 hover:text-white cursor-pointer';
    customView.classList.add('hidden');
    presetsView.classList.remove('hidden');
  }

  const networks = Object.keys(AppState.config.smmData || {});
  networkTabs.innerHTML = networks.map(key => {
    const net = AppState.config.smmData[key];
    const isSelected = AppState.smmState.activeNetwork === key;
    return `
      <button 
        type="button"
        onclick="setSmmNetwork('${key}')"
        class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
          isSelected 
            ? 'bg-gradient-to-r ' + net.color + ' text-white border-transparent shadow-md' 
            : 'bg-[#121424] border-[#1E2238] text-slate-400 hover:text-white'
        }"
      >
        <span>${net.name}</span>
      </button>
    `;
  }).join('');

  if (mode === 'custom') {
    renderSmmCustomView();
  } else {
    renderSmmPresetsView();
  }
}

function renderSmmCustomView() {
  const container = document.getElementById('smmCustomPackView');
  const summaryBox = document.getElementById('smmSummaryBox');
  const addBtn = document.getElementById('smmAddToCartBtn');
  if (!container || !summaryBox) return;

  const netKey = AppState.smmState.activeNetwork || 'instagram';
  const netData = (AppState.config.smmData && AppState.config.smmData[netKey]) || { services: [] };

  container.innerHTML = (netData.services || []).map(service => {
    const isEnabled = !!AppState.smmState.customEnabled[service.id];
    const { min, step } = getSmmServiceMinAndStep(service.id);
    const qty = AppState.smmState.customQuantities[service.id] || min;

    const unitCost = (service.costPer1000 / 1000) * qty;
    const unitPrice = calcSalePrice(unitCost, service.margin !== undefined ? service.margin : 50);

    return `
      <div class="p-3 rounded-xl border transition-all ${
        isEnabled 
          ? 'bg-purple-600/15 border-purple-500/60 shadow-sm' 
          : 'bg-[#08090F] border-[#1E2238] opacity-75'
      }">
        <div class="flex items-center justify-between gap-3 mb-2">
          <label class="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              ${isEnabled ? 'checked' : ''} 
              onchange="toggleSmmCustomItem('${service.id}')"
              class="w-4 h-4 rounded text-purple-600 focus:ring-0 bg-[#121424] border-slate-700 cursor-pointer"
            >
            <div>
              <span class="text-xs font-bold text-white block ${isEnabled ? 'text-purple-200' : ''}">${service.name}</span>
              <span class="text-[10px] text-slate-400 leading-tight block">${service.description}</span>
            </div>
          </label>

          <span class="text-xs font-black text-cyan-300 shrink-0">
            ${formatCurrency(unitPrice)}
          </span>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-[#1E2238]/60">
          <span class="text-[10px] text-slate-400">
            Cantidad (Mínimo: ${min.toLocaleString('es-AR')}):
          </span>

          <div class="flex items-center gap-1.5 bg-[#121424] px-1.5 py-0.5 rounded-lg border border-[#1E2238]">
            <button 
              type="button" 
              onclick="updateSmmCustomQty('${service.id}', -${step})"
              class="w-6 h-6 rounded bg-[#08090F] text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
            >-</button>
            <input 
              type="number" 
              value="${qty}" 
              min="${min}" 
              step="${step}"
              onchange="updateSmmCustomQty('${service.id}', this.value)"
              class="w-16 text-center text-xs font-mono font-bold bg-transparent text-white focus:outline-none"
            >
            <button 
              type="button" 
              onclick="updateSmmCustomQty('${service.id}', ${step})"
              class="w-6 h-6 rounded bg-[#08090F] text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
            >+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const pricing = calculateSmmCustomPricing();

  if (pricing.count === 0) {
    summaryBox.innerHTML = `
      <span class="text-xs text-amber-300 block font-semibold">Marcá al menos un servicio</span>
      <span class="text-[10px] text-slate-500">Mínimo 100 unidades por ítem</span>
    `;
    if (addBtn) {
      addBtn.disabled = true;
      addBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  } else {
    summaryBox.innerHTML = `
      <div class="flex items-baseline gap-2">
        <span class="text-xs text-slate-400 block uppercase font-bold">Total Pack:</span>
        <span class="text-xl font-black text-cyan-300">${formatCurrency(pricing.finalPrice)}</span>
      </div>
      <div class="flex items-center gap-2 text-[10px]">
        ${pricing.totalSavings > 0 ? `
          <span class="text-slate-500 line-through">${formatCurrency(pricing.regularSubtotal)}</span>
          <span class="text-emerald-400 font-bold">¡Ahorrás ${formatCurrency(pricing.totalSavings)}! (${pricing.discountPct}% OFF)</span>
        ` : `
          <span class="text-slate-400">${pricing.count} servicio(s) · ${pricing.totalUnits.toLocaleString('es-AR')} unidades</span>
        `}
      </div>
    `;
    if (addBtn) {
      addBtn.disabled = false;
      addBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

function renderSmmPresetsView() {
  const serviceTabs = document.getElementById('smmServiceTabs');
  const optionsGrid = document.getElementById('smmOptionsGrid');
  const serviceDesc = document.getElementById('smmServiceDescription');
  const summaryBox = document.getElementById('smmSummaryBox');
  const addBtn = document.getElementById('smmAddToCartBtn');

  if (!serviceTabs || !optionsGrid) return;

  const netKey = AppState.smmState.activeNetwork || 'instagram';
  const currentNetData = AppState.config.smmData[netKey];
  if (!currentNetData || !currentNetData.services) return;

  const activeService = currentNetData.services.find(s => s.id === AppState.smmState.activeServiceId) || currentNetData.services[0];

  serviceTabs.innerHTML = currentNetData.services.map(s => {
    const isSelected = activeService.id === s.id;
    return `
      <button 
        type="button"
        onclick="setSmmService('${s.id}')"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
          isSelected 
            ? 'bg-purple-600/25 border-purple-400 text-purple-200' 
            : 'bg-[#0B0C14] border-[#1E2238] text-slate-400 hover:text-white'
        }"
      >
        ${s.name}
      </button>
    `;
  }).join('');

  if (serviceDesc) serviceDesc.textContent = activeService.description;

  optionsGrid.innerHTML = (activeService.options || []).map(opt => {
    const isSelected = AppState.smmState.selectedOptionId === opt.id;
    return `
      <button 
        type="button"
        onclick="setSmmOption('${opt.id}')"
        class="p-3 rounded-xl border text-left flex items-center justify-between transition-all w-full cursor-pointer ${
          isSelected 
            ? 'bg-purple-600/20 border-purple-400 text-white shadow-md' 
            : 'bg-[#0B0C14] border-[#1E2238] text-slate-300 hover:border-slate-600'
        }"
      >
        <div>
          <div class="text-xs font-bold">${opt.label}</div>
          ${opt.popular ? '<span class="text-[10px] text-amber-400 font-semibold">★ Más Elegido</span>' : ''}
        </div>
        <div class="text-xs font-black text-cyan-300">
          ${formatCurrency(opt.price)}
        </div>
      </button>
    `;
  }).join('');

  const currentOption = (activeService.options || []).find(o => o.id === AppState.smmState.selectedOptionId) || activeService.options[0];

  if (summaryBox && currentOption) {
    summaryBox.innerHTML = `
      <div class="flex items-baseline gap-2">
        <span class="text-xs text-slate-400 block uppercase font-bold">Total:</span>
        <span class="text-xl font-black text-cyan-300">${formatCurrency(currentOption.price)}</span>
      </div>
      <span class="text-[10px] text-slate-400">${currentOption.label}</span>
    `;
  }

  if (addBtn) {
    addBtn.disabled = false;
    addBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

function setSmmService(serviceId) {
  AppState.smmState.activeServiceId = serviceId;
  const netData = AppState.config.smmData[AppState.smmState.activeNetwork];
  const service = netData.services.find(s => s.id === serviceId);
  if (service && service.options && service.options.length > 0) {
    AppState.smmState.selectedOptionId = service.options[0].id;
  }
  renderSmmModalContent();
}

function setSmmOption(optionId) {
  AppState.smmState.selectedOptionId = optionId;
  renderSmmModalContent();
}

function submitSmmToCart() {
  const mode = AppState.smmState.mode || 'custom';
  const targetInput = document.getElementById('smmTargetInput');
  const targetVal = targetInput ? targetInput.value.trim() : '';

  if (mode === 'custom') {
    const pricing = calculateSmmCustomPricing();
    if (pricing.count === 0) {
      showToast('Seleccioná al menos un servicio para armar tu pack SMM', 'warning');
      return;
    }

    const detailsList = pricing.enabledItems.map(item => `${item.qty.toLocaleString('es-AR')} ${item.service.name}`).join(' + ');

    addToCart({
      productId: 'smm-pack-medida',
      name: `Pack SMM a Medida (${pricing.netData.name})`,
      variantName: `${detailsList}${targetVal ? ' · ' + targetVal : ''}${pricing.discountPct > 0 ? ` (${pricing.discountPct}% OFF)` : ''}`,
      price: pricing.finalPrice,
      quantity: 1
    });

    closeSmmModal();
    showToast(`¡Pack SMM a medida (${pricing.count} servicios) agregado al pedido!`);
  } else {
    const currentNetData = AppState.config.smmData[AppState.smmState.activeNetwork];
    if (!currentNetData) return;

    const activeService = currentNetData.services.find(s => s.id === AppState.smmState.activeServiceId);
    if (!activeService) return;

    const currentOption = (activeService.options || []).find(o => o.id === AppState.smmState.selectedOptionId) || activeService.options[0];
    if (!currentOption) return;

    let details = `${currentNetData.name} - ${currentOption.label}`;
    if (targetVal) details += ` (${targetVal})`;

    addToCart({
      productId: 'smm-crecimiento-redes',
      name: `SMM: ${currentNetData.name} ${activeService.name}`,
      variantName: details,
      price: currentOption.price,
      quantity: 1
    });

    closeSmmModal();
    showToast('¡Servicio SMM agregado al pedido!');
  }
}

// ==============================================================================
// 8. PANEL DE ADMINISTRADOR INTERACTIVO (DASHBOARD & MARGEN AUTOMÁTICO)
// ==============================================================================

function openAdminLoginModal() {
  const modal = document.getElementById('adminLoginModal');
  const pinInput = document.getElementById('adminPinInput');
  const errEl = document.getElementById('adminPinError');
  if (errEl) errEl.classList.add('hidden');
  if (pinInput) pinInput.value = '';
  if (modal) modal.classList.remove('hidden');
  setTimeout(() => {
    if (pinInput) pinInput.focus();
  }, 100);
}

function closeAdminLoginModal() {
  const modal = document.getElementById('adminLoginModal');
  if (modal) modal.classList.add('hidden');
  if (window.location.hash === '#admin') {
    history.replaceState(null, null, ' ');
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pinInput = document.getElementById('adminPinInput');
  const errEl = document.getElementById('adminPinError');
  const enteredPin = pinInput ? pinInput.value.trim() : '';
  const realPin = AppState.config.adminPin || '1234';

  if (enteredPin === realPin) {
    AppState.isAdminLoggedIn = true;
    closeAdminLoginModal();
    openAdminDashboard();
  } else {
    if (errEl) errEl.classList.remove('hidden');
    if (pinInput) pinInput.select();
  }
}

function openAdminDashboard() {
  const modal = document.getElementById('adminDashboardModal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const waInput = document.getElementById('adminSettingWhatsApp');
  const igInput = document.getElementById('adminSettingInstagram');
  const pinInput = document.getElementById('adminSettingPin');
  const showPricesCheck = document.getElementById('adminSettingShowPrices');
  const marginSlider = document.getElementById('globalMarginSlider');
  const marginInput = document.getElementById('globalMarginInput');

  if (waInput) waInput.value = AppState.config.whatsappNumber || '5492634377019';
  if (igInput) igInput.value = AppState.config.instagramUser || '@sonrisas182';
  if (pinInput) pinInput.value = AppState.config.adminPin || '1234';
  if (showPricesCheck) showPricesCheck.checked = AppState.config.showPrices !== false;
  if (marginSlider) marginSlider.value = AppState.config.defaultProfitMargin || 40;
  if (marginInput) marginInput.value = AppState.config.defaultProfitMargin || 40;

  switchAdminTab('general');
}

function closeAdminDashboard() {
  const modal = document.getElementById('adminDashboardModal');
  if (modal) modal.classList.add('hidden');
}

function switchAdminTab(tabKey) {
  const tabs = ['general', 'products', 'smm'];
  tabs.forEach(t => {
    const content = document.getElementById(`adminTab-${t}`);
    const btn = document.getElementById(`adminTabBtn-${t}`);
    if (content) {
      if (t === tabKey) content.classList.remove('hidden');
      else content.classList.add('hidden');
    }
    if (btn) {
      if (t === tabKey) {
        btn.classList.add('border-cyan-400', 'text-cyan-300', 'bg-[#121424]');
        btn.classList.remove('border-transparent', 'text-slate-400');
      } else {
        btn.classList.remove('border-cyan-400', 'text-cyan-300', 'bg-[#121424]');
        btn.classList.add('border-transparent', 'text-slate-400');
      }
    }
  });

  if (tabKey === 'products') renderAdminProductsTable();
  if (tabKey === 'smm') renderAdminSmmTable();
}

function applyGlobalMarginToAll() {
  const input = document.getElementById('globalMarginInput');
  const newMargin = Number(input ? input.value : 40) || 40;

  AppState.config.defaultProfitMargin = newMargin;

  // 1. Recalcular cada servicio en base a su costo más alto
  (AppState.config.products || []).forEach(product => {
    product.margin = newMargin;
    product.price = calcSalePrice(product.costPrice, newMargin);

    if (product.carrierPricing) {
      Object.keys(product.carrierPricing).forEach(ck => {
        product.carrierPricing[ck].margin = newMargin;
        product.carrierPricing[ck].price = calcSalePrice(product.carrierPricing[ck].costPrice, newMargin);
      });
    }
  });

  // 2. Recalcular Combos
  (AppState.config.comboTiers || []).forEach(t => {
    t.margin = newMargin;
    t.price = calcSalePrice(t.costPrice, newMargin);
  });

  // 3. Recalcular SMM
  const smmData = AppState.config.smmData || {};
  Object.keys(smmData).forEach(netKey => {
    (smmData[netKey].services || []).forEach(srv => {
      srv.margin = newMargin;
      (srv.options || []).forEach(opt => {
        opt.margin = newMargin;
        opt.price = calcSalePrice(opt.costPrice, newMargin);
      });
    });
  });

  saveConfigToStorage();
  renderProducts();
  showToast(`¡Margen del ${newMargin}% aplicado a TODO el catálogo!`);
}

function toggleShowPricesSetting(enabled) {
  AppState.config.showPrices = enabled;
  saveConfigToStorage();
  renderProducts();
  showToast(enabled ? 'Precios visibles en la tienda' : 'Modo "Consultar cotización" activado');
}

function saveAdminSettings() {
  const waInput = document.getElementById('adminSettingWhatsApp');
  const igInput = document.getElementById('adminSettingInstagram');
  const pinInput = document.getElementById('adminSettingPin');

  if (waInput) AppState.config.whatsappNumber = waInput.value.replace(/[^0-9]/g, '');
  if (igInput) {
    const val = igInput.value.trim();
    AppState.config.instagramUser = val;
    AppState.config.instagramUrl = `https://instagram.com/${val.replace('@', '')}`;
  }
  if (pinInput && pinInput.value.trim()) {
    AppState.config.adminPin = pinInput.value.trim();
  }

  saveConfigToStorage();
  syncContactElements();
  showToast('Ajustes de contacto y seguridad guardados');
}

// ==============================================================================
// 9. TABLA DE EDICIÓN RÁPIDA DE SERVICIOS EN EL PANEL ADMIN (1 FILA POR SERVICIO)
// ==============================================================================

function renderAdminProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  const searchInput = document.getElementById('adminProductSearch');
  const catFilter = document.getElementById('adminProductCatFilter');
  if (!tbody) return;

  const query = (searchInput ? searchInput.value.toLowerCase() : '');
  const cat = (catFilter ? catFilter.value : 'all');

  let rowsHtml = '';

  (AppState.config.products || []).forEach(product => {
    if (cat !== 'all' && product.category !== cat) return;
    if (product.isSpecialSMM) return; // SMM se gestiona en su pestaña dedicada

    if (query && !product.name.toLowerCase().includes(query)) return;

    const cost = product.costPrice || 0;
    const margin = product.margin !== undefined ? product.margin : 40;
    const sale = product.price || calcSalePrice(cost, margin);
    const profit = sale - cost;

    rowsHtml += `
      <tr class="hover:bg-[#121424]/80 transition">
        <td class="p-3.5">
          <div class="font-bold text-white">${product.name}</div>
          <div class="text-[11px] text-slate-400">${product.period || '30 días'}</div>
        </td>
        <td class="p-3.5">
          <span class="px-2 py-0.5 rounded text-[10px] bg-[#121424] text-slate-300 border border-[#1E2238] uppercase">
            ${product.category}
          </span>
        </td>
        <td class="p-3.5">
          <div class="flex items-center gap-1 bg-[#08090F] border border-[#1E2238] rounded-lg px-2 py-1">
            <span class="text-slate-500">$</span>
            <input 
              type="number" 
              value="${cost}" 
              onchange="handleAdminRowCostChange('${product.id}', this.value)"
              class="w-20 bg-transparent text-white font-bold focus:outline-none"
            >
          </div>
        </td>
        <td class="p-3.5">
          <div class="flex items-center gap-1 bg-[#08090F] border border-[#1E2238] rounded-lg px-2 py-1">
            <input 
              type="number" 
              value="${margin}" 
              onchange="handleAdminRowMarginChange('${product.id}', this.value)"
              class="w-12 bg-transparent text-cyan-300 font-bold focus:outline-none"
            >
            <span class="text-cyan-400 font-bold">%</span>
          </div>
        </td>
        <td class="p-3.5">
          <div class="flex items-center gap-1 bg-[#08090F] border border-cyan-500/30 rounded-lg px-2 py-1">
            <span class="text-slate-500">$</span>
            <input 
              type="number" 
              value="${sale}" 
              onchange="handleAdminRowPriceChange('${product.id}', this.value)"
              class="w-20 bg-transparent text-emerald-400 font-black focus:outline-none"
            >
          </div>
        </td>
        <td class="p-3.5">
          <span class="text-xs font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}">
            +$${profit.toLocaleString('es-AR')}
          </span>
        </td>
        <td class="p-3.5 text-center">
          <button 
            onclick="handleAdminDeleteProduct('${product.id}')"
            class="text-slate-500 hover:text-red-400 p-1.5 rounded transition"
            title="Eliminar producto"
          >
            ${getIconSvg('Trash2', 'w-4 h-4')}
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = rowsHtml || `
    <tr>
      <td colspan="7" class="p-8 text-center text-slate-500">
        No se encontraron servicios con ese filtro.
      </td>
    </tr>
  `;
}

function handleAdminRowCostChange(productId, newCostVal) {
  const cost = Number(newCostVal) || 0;
  const product = (AppState.config.products || []).find(p => p.id === productId);
  if (!product) return;

  product.costPrice = cost;
  product.price = calcSalePrice(cost, product.margin !== undefined ? product.margin : 40);

  saveConfigToStorage();
  renderAdminProductsTable();
  renderProducts();
  showToast(`Costo actualizado: $${cost}`);
}

function handleAdminRowMarginChange(productId, newMarginVal) {
  const margin = Number(newMarginVal) || 0;
  const product = (AppState.config.products || []).find(p => p.id === productId);
  if (!product) return;

  product.margin = margin;
  product.price = calcSalePrice(product.costPrice, margin);

  saveConfigToStorage();
  renderAdminProductsTable();
  renderProducts();
  showToast(`Margen ajustado: ${margin}%`);
}

function handleAdminRowPriceChange(productId, newPriceVal) {
  const price = Number(newPriceVal) || 0;
  const product = (AppState.config.products || []).find(p => p.id === productId);
  if (!product) return;

  product.price = price;
  if (product.costPrice && product.costPrice > 0) {
    product.margin = Math.round(((price - product.costPrice) / product.costPrice) * 100);
  }

  saveConfigToStorage();
  renderAdminProductsTable();
  renderProducts();
  showToast(`Precio fijado en $${price}`);
}

function handleAdminDeleteProduct(productId) {
  if (confirm('¿Eliminar este servicio del catálogo?')) {
    AppState.config.products = (AppState.config.products || []).filter(p => p.id !== productId);
    saveConfigToStorage();
    renderAdminProductsTable();
    renderProducts();
    showToast('Servicio eliminado');
  }
}

// ==============================================================================
// 10. TABLA DE EDICIÓN SMM EN EL PANEL ADMIN
// ==============================================================================

function renderAdminSmmTable() {
  const tbody = document.getElementById('adminSmmTableBody');
  if (!tbody) return;

  const smmData = AppState.config.smmData || {};
  let rowsHtml = '';

  Object.keys(smmData).forEach(netKey => {
    const net = smmData[netKey];
    (net.services || []).forEach(service => {
      const costPer1000 = service.costPer1000 || 0;
      const margin = service.margin !== undefined ? service.margin : 50;
      const salePer1000 = calcSalePrice(costPer1000, margin);
      const profitPer1000 = salePer1000 - costPer1000;

      rowsHtml += `
        <tr class="hover:bg-[#121424]/80 transition">
          <td class="p-3.5 font-bold text-white">${net.name}</td>
          <td class="p-3.5 text-cyan-300 font-semibold">${service.name}</td>
          <td class="p-3.5">
            <div class="flex items-center gap-1 bg-[#08090F] border border-[#1E2238] rounded-lg px-2 py-1">
              <span class="text-slate-500">$</span>
              <input 
                type="number" 
                value="${costPer1000}" 
                onchange="handleAdminSmmCostChange('${netKey}', '${service.id}', this.value)"
                class="w-20 bg-transparent text-white font-bold focus:outline-none"
              >
            </div>
          </td>
          <td class="p-3.5">
            <div class="flex items-center gap-1 bg-[#08090F] border border-[#1E2238] rounded-lg px-2 py-1">
              <input 
                type="number" 
                value="${margin}" 
                onchange="handleAdminSmmMarginChange('${netKey}', '${service.id}', this.value)"
                class="w-12 bg-transparent text-cyan-300 font-bold focus:outline-none"
              >
              <span class="text-cyan-400 font-bold">%</span>
            </div>
          </td>
          <td class="p-3.5 font-black text-emerald-400">
            $${salePer1000.toLocaleString('es-AR')}
          </td>
          <td class="p-3.5 text-emerald-400 font-bold">
            +$${profitPer1000.toLocaleString('es-AR')}
          </td>
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml;
}

function handleAdminSmmCostChange(netKey, serviceId, newCost) {
  const cost = Number(newCost) || 0;
  const net = AppState.config.smmData[netKey];
  if (!net) return;
  const service = net.services.find(s => s.id === serviceId);
  if (!service) return;

  service.costPer1000 = cost;
  (service.options || []).forEach(opt => {
    const ratio = (opt.count || 1000) / 1000;
    opt.costPrice = Math.round(cost * ratio);
    opt.price = calcSalePrice(opt.costPrice, opt.margin !== undefined ? opt.margin : service.margin || 50);
  });

  saveConfigToStorage();
  renderAdminSmmTable();
  showToast(`Costo de SMM actualizado: $${cost}/1.000`);
}

function handleAdminSmmMarginChange(netKey, serviceId, newMargin) {
  const margin = Number(newMargin) || 0;
  const net = AppState.config.smmData[netKey];
  if (!net) return;
  const service = net.services.find(s => s.id === serviceId);
  if (!service) return;

  service.margin = margin;
  (service.options || []).forEach(opt => {
    opt.margin = margin;
    opt.price = calcSalePrice(opt.costPrice, margin);
  });

  saveConfigToStorage();
  renderAdminSmmTable();
  showToast(`Margen de SMM actualizado: ${margin}%`);
}

// ==============================================================================
// 11. MODAL: AGREGAR NUEVO SERVICIO AL CATÁLOGO
// ==============================================================================

function openNewProductModal() {
  const modal = document.getElementById('newProductModal');
  if (modal) modal.classList.remove('hidden');
}

function closeNewProductModal() {
  const modal = document.getElementById('newProductModal');
  if (modal) modal.classList.add('hidden');
}

function calcNewProductSalePrice() {
  const cost = Number(document.getElementById('newProdCost').value) || 0;
  const margin = Number(document.getElementById('newProdMargin').value) || 40;
  const priceInput = document.getElementById('newProdPrice');
  if (priceInput) {
    priceInput.value = calcSalePrice(cost, margin);
  }
}

function handleCreateProduct(e) {
  e.preventDefault();
  const name = document.getElementById('newProdName').value.trim();
  const category = document.getElementById('newProdCategory').value;
  const period = document.getElementById('newProdPeriod').value.trim() || '30 días';
  const cost = Number(document.getElementById('newProdCost').value) || 0;
  const margin = Number(document.getElementById('newProdMargin').value) || 40;
  const price = Number(document.getElementById('newProdPrice').value) || calcSalePrice(cost, margin);
  const badge = document.getElementById('newProdBadge').value.trim() || 'Nuevo';
  const description = document.getElementById('newProdDescription').value.trim() || 'Servicio digital de alta calidad con activación inmediata.';
  const benefitsRaw = document.getElementById('newProdBenefits').value.trim();
  const benefits = benefitsRaw 
    ? benefitsRaw.split('\n').map(b => b.trim()).filter(Boolean)
    : ['Activación rápida en minutos', 'Garantía y soporte garantizado'];

  const newId = 'prod_' + Date.now();

  const newProduct = {
    id: newId,
    name: name,
    category: category,
    badge: badge,
    period: period,
    costPrice: cost,
    margin: margin,
    price: price,
    icon: category === 'streaming' ? 'Film' : category === 'creadores-ia' ? 'Sparkles' : category === 'conectividad' ? 'Wifi' : 'Tv',
    gradient: 'from-cyan-500 to-purple-600',
    description: description,
    benefits: benefits
  };

  AppState.config.products.unshift(newProduct);
  saveConfigToStorage();

  closeNewProductModal();
  renderAdminProductsTable();
  renderProducts();
  showToast(`¡Servicio "${name}" publicado en el catálogo!`);
}

// ==============================================================================
// 12. EXPORTACIÓN DEL CÓDIGO CATALOGCONFIG.JS PARA VERCEL
// ==============================================================================

function exportUpdatedConfigJs() {
  const code = `/**
 * ==============================================================================
 * SONRI SOLUCIONES DIGITALES — CONFIGURACIÓN CENTRAL ACTUALIZADA
 * Generada desde el Panel de Administrador
 * ==============================================================================
 */

const CATALOG_CONFIG = ${JSON.stringify(AppState.config, null, 2)};

// Disponibilidad en el objeto global window para ejecución directa en navegador
if (typeof window !== "undefined") {
  window.CATALOG_CONFIG = CATALOG_CONFIG;
}

// Exportación compatible con Node.js y bundlers
if (typeof module !== "undefined" && module.exports) {
  module.exports = CATALOG_CONFIG;
}
`;

  navigator.clipboard.writeText(code).then(() => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'catalogConfig.js';
    link.click();
    showToast('¡Archivo catalogConfig.js descargado y código copiado!');
  }).catch(() => {
    showToast('Archivo listo para guardar');
  });
}

// ==============================================================================
// 13. PREGUNTAS FRECUENTES (FAQ)
// ==============================================================================

function renderFaqs() {
  const container = document.getElementById('faqAccordionContainer');
  if (!container) return;

  container.innerHTML = (AppState.config.faqs || []).map((faq, idx) => {
    return `
      <div class="glass-panel rounded-2xl border border-[#1E2238] overflow-hidden transition-all duration-300">
        <button 
          onclick="toggleFaq(${idx})" 
          class="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm md:text-base hover:text-cyan-300 transition-colors"
        >
          <span>${faq.question}</span>
          <span id="faq-icon-${idx}" class="text-cyan-400 transform transition-transform duration-300 shrink-0">
            ${getIconSvg('ChevronDown', 'w-5 h-5')}
          </span>
        </button>
        <div id="faq-answer-${idx}" class="hidden px-5 pb-5 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-[#1E2238]/60 pt-3">
          ${faq.answer}
        </div>
      </div>
    `;
  }).join('');
}

function toggleFaq(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer || !icon) return;

  const isHidden = answer.classList.contains('hidden');
  if (isHidden) {
    answer.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    answer.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

// ==============================================================================
// 14. BÚSQUEDA Y MAPEO DE ICONOS VECTORIALES
// ==============================================================================

function setupSearchListener() {
  const searchInput = document.getElementById('catalogSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    renderProducts();
  });
}

function clearSearch() {
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';
  AppState.searchQuery = '';
  AppState.activeCategory = 'all';
  renderCategories();
  renderProducts();
}

function getIconSvg(iconName, classes = 'w-5 h-5') {
  const icons = {
    Film: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`,
    Sparkles: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    Wifi: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    Tv: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
    TrendingUp: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    CheckCircle2: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    ShoppingCart: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
    Send: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    Search: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    Trash2: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    ChevronDown: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    Zap: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    Sliders: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
    PlusCircle: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    MessageSquare: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    Video: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>`,
    Palette: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    Bot: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
    Cpu: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    Wand2: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>`,
    BookOpen: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    Radio: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`,
    MonitorPlay: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/><polygon points="10 7 15 10 10 13 10 7"/></svg>`,
    HardDrive: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>`,
    PlaySquare: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
    Clapperboard: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 6 3 11l-.9-2.4 17.2-5 1 2.4z"/><rect width="18" height="12" x="3" y="9" rx="2"/></svg>`,
    Star: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    Compass: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    Monitor: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    Heart: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    Layers: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    Flame: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    Music2: `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="18" r="4"/><path d="M12 18V2l10 4"/></svg>`
  };

  return icons[iconName] || icons.Sparkles;
}

// ==============================================================================
// 15. INICIALIZACIÓN DE LA APLICACIÓN
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initAppConfig();
  initSupabaseClient();
  loadCartFromStorage();
  updateCartBadge();
  renderCategories();
  renderProducts();
  renderFaqs();
  setupSearchListener();
  checkUrlHashForAdmin();

  // Consulta en segundo plano para actualizar precios desde la nube
  fetchCloudConfig();

  window.addEventListener('hashchange', checkUrlHashForAdmin);

  // Atajos de teclado: Escape cierra modales; Ctrl+Shift+A abre login admin
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeComboModal();
      closeSmmModal();
      closeAdminLoginModal();
      closeAdminDashboard();
      closeNewProductModal();
      toggleCartDrawer(false);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminLoginModal();
    }
  });
});
